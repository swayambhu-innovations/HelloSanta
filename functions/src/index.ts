const functions = require('firebase-functions');
const Razorpay = require('razorpay');
const nodemailer = require('nodemailer');
var key_id = 'rzp_test_1GPCwB7UYA1pfl';
var key_secret = '3v5jh3ZOsERttf0ZGE1gbmNj';
var request = require('request');
const cors = require('cors')({ origin: true });
var instance = new Razorpay({
  key_id: key_id,
  key_secret: key_secret,
});
var transporter = nodemailer.createTransport({
  name: 'www.hellosanta.in',
  host: 'mail.hellosanta.in',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'connect@hellosanta.in', // your domain email address
    pass: 'Support@9208Santa', // your password
  },
  tls:{
    rejectUnauthorized:false
  },
  logger: true,
  debug: true
});

exports.sendMail = functions.https.onRequest((req: any, res: any) => {
  return cors(req, res, () => {
    const mailOptions = {
      from: 'Hello Santa <connect@hellosanta.in>',
      to: req.body.email,
      subject: req.body.subject,
      html: req.body.content,
    };
    console.log(mailOptions);
    return transporter.sendMail(mailOptions, (erro: any, info: any) => {
      // console.log(info);
      if (erro) {
        console.log(erro);
        return res.send(erro.toString());
      }
      return res.status(200).send({'msg':'Sended'});
    });
  });
});
exports.createOrder = functions.https.onRequest((req: any, res: any) => {
  return cors(req, res, () => {
    var options = {
      amount: req.body.amount,
      currency: 'INR',
      receipt: req.body.receipt,
    };
    instance.orders.create(options, (err: any, order: any) => {
      order ? res.status(200).send(order) : res.status(500).send(err);
    });
  });
});
exports.capturePayments = functions.https.onRequest((req: any, res: any) => {
  return cors(req, res, () => {
    request(
      {
        method: 'POST',
        url: `https://${key_id}:${key_secret}@api.razorpay.com/v1/payments/${req.body.payment_id}/capture`,
        form: {
          amount: req.body.amount,
        },
      },
      (error: any, response: any, body: any) => {
        response
          ? res.status(200).send({
              res: response,
              req: req.body,
              body: body,
            })
          : res.status(500).send(error);
      }
    );
  });
});

exports.shipOrder = functions.https.onRequest((req: any, res: any) => {
  return cors(req, res, () => {
    console.log('request body', req.body, typeof req.body);
    var date = new Date();
    var orderDate =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    var compliedRes = req.body;
    let shiprocketBody = {
      order_id: compliedRes.order_id,
      order_date: orderDate,
      pickup_location: 'Primary',
      company_name: 'Hello Santa',
      billing_customer_name: compliedRes.billing_customer_name,
      billing_last_name: compliedRes.billing_last_name,
      billing_city: compliedRes.billing_city,
      billing_pincode: compliedRes.billing_pincode,
      billing_state: compliedRes.billing_state,
      billing_country: compliedRes.billing_country,
      billing_email: compliedRes.billing_email,
      billing_phone: compliedRes.billing_phone,
      billing_address: compliedRes.billing_address,
      shipping_is_billing: true,
      order_items: compliedRes.order_items,
      payment_method: compliedRes.payment_method,
      sub_total: compliedRes.sub_total,
      length: compliedRes.length,
      breadth: compliedRes.breadth,
      height: compliedRes.height,
      weight: compliedRes.weight,
    };
    var options = {
      method: 'POST',
      url: 'https://apiv2.shiprocket.in/v1/external/auth/login',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'hellosantaapi@gmail.com',
        password: 'Poiuy@09876',
      }),
    };
    console.log('shiprocket data', shiprocketBody);
    request(options, function (error: any, authResponse: any) {
      if (error) throw new Error(error);
      var response = JSON.parse(authResponse.body);
      console.log('authApi', response, typeof response.body);
      var authApiKey = response.token;
      console.log('authApiKey', authApiKey);
      var shipoptions = {
        method: 'POST',
        url: 'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authApiKey,
        },
        body: JSON.stringify(shiprocketBody),
      };
      request(shipoptions, function (error: any, shipResponse: any) {
        if (error) throw new Error(error);
        console.log(shipResponse.body);
        let shipResponseBody = JSON.parse(shipResponse.body);
        shipResponseBody['orderDate'] = orderDate;
        shipResponse
          ? res.status(200).send({
              res: shipResponse,
              req: req.body,
              body: shipResponseBody,
            })
          : res.status(500).send(error);
      });
    });
  });
});

exports.checkOrderShipment = functions.https.onRequest((req: any, res: any) => {
  return cors(req, res, () => {
    var authOptions = {
      method: 'POST',
      url: 'https://apiv2.shiprocket.in/v1/external/auth/login',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'hellosantaapi@gmail.com',
        password: 'Poiuy@09876',
      }),
    };
    request(authOptions, function (error: any, authResponse: any) {
      if (error) throw new Error(error);
      var response = JSON.parse(authResponse.body);
      var options = {
        method: 'GET',
        url:
          'https://apiv2.shiprocket.in/v1/external/shipments/' +
          req.body.shipmentId,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + response.token,
        },
      };
      request(options, function (error: any, response: any) {
        if (error) throw new Error(error);
        response
          ? res.status(200).send({
              res: response,
              req: req.body,
              body: response.body,
            })
          : res.status(500).send(error);
      });
    });
  });
});

exports.cancelOrderShipment = functions.https.onRequest(
  (req: any, res: any) => {
    return cors(req, res, () => {
      var authOptions = {
        method: 'POST',
        url: 'https://apiv2.shiprocket.in/v1/external/auth/login',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'hellosantaapi@gmail.com',
          password: 'Poiuy@09876',
        }),
      };
      request(authOptions, function (error: any, authResponse: any) {
        if (error) throw new Error(error);
        var response = JSON.parse(authResponse.body);
        console.log('authApi', response, req.body.ids, typeof req.body.ids);
        var options = {
          method: 'POST',
          url: 'https://apiv2.shiprocket.in/v1/external/orders/cancel',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + response.token,
          },
          body: JSON.stringify({
            ids: req.body.ids,
          }),
        };
        request(options, function (error: any, response: any) {
          if (error) throw new Error(error);
          console.log('response', response);
          response
            ? res.status(200).send({
                res: response,
                req: req.body,
                body: response.body,
              })
            : res.status(500).send(error);
        });
      });
    });
  }
);
