const functions = require('firebase-functions');
const Razorpay = require('razorpay');
const nodefetch = require('node-fetch');
const admin = require('firebase-admin');
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
var key_id = 'rzp_test_1GPCwB7UYA1pfl';
var key_secret = '3v5jh3ZOsERttf0ZGE1gbmNj';
var request = require('request');
const cors = require('cors')({ origin: true });
var instance = new Razorpay({
  key_id: key_id,
  key_secret: key_secret,
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
  let shipCredentials = {
    email: 'hellosantaapi@gmail.com',
    password: 'Poiuy@09876',
  };
  var date = new Date();
  var orderDate =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  let orderID = req.body.order_id;
  let pickup_location = '';
  let company_name = 'Hello Santa';
  let billing_customer_name = req.body.billing_customer_name;
  let billing_city = req.body.billing_city;
  let billing_pincode = req.body.billing_pincode;
  let billing_state = req.body.billing_state;
  let billing_country = req.body.billing_country;
  let billing_email = req.body.billing_email;
  let billing_phone = req.body.billing_phone;
  let orderItems = req.body.orderItems;
  let payment_method = req.body.payment_method;
  let sub_total = req.body.sub_total;
  let length = req.body.length;
  let breadth = req.body.breadth;
  let height = req.body.height;
  let weight = req.body.weight;
  let shiprocketBody = {
    order_id: orderID,
    order_date: orderDate,
    pickup_location: pickup_location,
    company_name: company_name,
    billing_customer_name: billing_customer_name,
    billing_city: billing_city,
    billing_pincode: billing_pincode,
    billing_state: billing_state,
    billing_country: billing_country,
    billing_email: billing_email,
    billing_phone: billing_phone,
    shipping_is_billing:true,
    order_items: orderItems,
    payment_method: payment_method,
    sub_total: sub_total,
    length: length,
    breadth: breadth,
    height: height,
    weight: weight,
  }
  nodefetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
    body: JSON.stringify(shipCredentials),
    headers: { 'Content-Type': 'application/json' },
  }).then((res: any) => { 
    let token = res.json();
    nodefetch('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', {
      method: 'POST',
      body: JSON.stringify(shiprocketBody),
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token.token },
    })
      .then((res: any) => {
        res ? res.status(200).send({
          res: res,
          req: req.body,
          body: shiprocketBody,
        })
        : res.status(500).send(res)
      })
      
    });
});
