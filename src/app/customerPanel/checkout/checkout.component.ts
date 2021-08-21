import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private afs: AngularFirestore,
    public dataProvider: DataProvider,
    private paymentService: PaymentService,
    private changeRef: ChangeDetectorRef,
    private authService: AuthService,
    private formbuilder: FormBuilder,
    private router: Router,
  ) {
    this.form = this.formbuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      addressLine1: this.addressLine1,
      city: this.city,
      pincode: this.pincode,
      state: this.state,
      country: this.country,
    });
  }
  form: FormGroup;
  firstName: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  lastName: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.email,
  ]);
  phoneNumber: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern('[0-9]{10}'),
  ]);
  addressLine1: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  city: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  pincode: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  state: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  country: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('[a-zA-Z ]*'),
  ]);

  orders = [];
  objectKeys = Object.keys;
  quantity = 0;
  payableAmount = 0;
  WindowRef: any;
  processingPayment: boolean;
  paymentResponse: any = {};
  orderItems = [];

  get grandTotal(): number {
    var total = 0;
    this.orders.forEach((order) => {
      total += order.productPrice;
    });
    return total;
  }
  get grandHeight():number{
    var total = 0;
    this.orders.forEach((order) => {
      
      total += order.finalPrice;
    });
    return total;
  }
  ngOnInit() {
    this.dataProvider.checkOutdata.forEach((prod) => {
      var docRef = this.afs.collection('products').ref.doc(prod.productData);
      docRef.get().then((data) => {
        if (data.exists) {
          console.log('Document data:', data  );
          let dat:any = data.data();
          this.orderItems.push({
            name:dat.productName,
            sku:prod.productData,
            units:1,
            selling_price:500,
          })
          dat['finalPrice'] = prod.price;
          dat['selections'] = prod.extrasData;
          this.orders.push(dat);
        } else {
          console.log('No such document!');
        }
      });
    });
    this.WindowRef = this.paymentService.WindowRef;
  }
  proceedToPay($event) {
    this.processingPayment = true;
    this.payableAmount = this.grandTotal * 100;
    console.log('payable amount', this.payableAmount);
    this.initiatePaymentModal($event);
  }

  initiatePaymentModal(event) {
    let receiptNumber = `Receipt#${Math.floor(Math.random() * 5123 * 43) + 10}`;

    let orderDetails = {
      amount: this.payableAmount,
      receipt: receiptNumber,
    };

    this.paymentService.createOrder(orderDetails).subscribe(
      (order) => {
        console.log(
          'TCL: CheckoutComponent -> initiatePaymentModal -> order',
          order
        );
        var rzp1 = new this.WindowRef.Razorpay(
          this.preparePaymentDetails(order)
        );
        this.processingPayment = false;
        rzp1.open();
        event.preventDefault();
      },
      (error) => {
        console.log(
          'TCL: CheckoutComponent -> initiatePaymentModal -> error',
          error
        );
        this.authService.presentToast(error.message);
      }
    );
  }

  preparePaymentDetails(order) {
    var ref = this;
    return {
      key: environment.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: this.payableAmount, // Amount is in currency subunits. Default currency is INR. Hence, 29935 refers to 29935 paise or INR 299.35.
      name: 'Pay',
      currency: order.currency,
      order_id: order.id, //This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
      image: 'https://angular.io/assets/images/logos/angular/angular.png',
      handler: function (response) {
        ref.handlePayment(response);
      },
      prefill: {
        name: this.form.get('firstName')!.value.toString()+this.form.get('lastName')!.value.toString(),
        email: this.form.get('email')!.value,
        contact: this.form.get('phoneNumber')!.value,
      },
      theme: {
        color: '#2874f0',
      },
    };
  }

  handlePayment(response) {
    this.paymentService
      .capturePayment({
        amount: this.payableAmount,
        payment_id: response.razorpay_payment_id,
      })
      .subscribe(
        (res) => {
          this.paymentResponse = res;
          this.changeRef.detectChanges();
          console.log('success response', this.paymentResponse);
          let shippingDetail = {
            order_id: `Order#${Math.floor(Math.random() * 5123435345 * 43) + 10}`,
            billing_customer_name:this.form.get('firstName')!.value,
            billing_last_name:this.form.get('lastName')!.value,
            billing_city: this.form.get('city')!.value,
            billing_pincode: this.form.get('pincode')!.value,
            billing_state: this.form.get('state')!.value,
            billing_country: this.form.get('country')!.value,
            billing_email: this.form.get('email')!.value,
            billing_phone: this.form.get('phoneNumber')!.value,
            billing_address: this.form.get('addressLine1')!.value,
            order_items:this.orderItems,
            payment_method: 'Prepaid',
            sub_total:this.grandTotal,
            length:1,
            height:1,
            weight:1,
            breadth:1,
          }
          console.log('shippingDetail',shippingDetail);
          this.paymentService.shipOrder(shippingDetail).subscribe((res)=>{
            console.log('shipping Confirmed Detail',res);
            this.authService.presentToast('Order Placed Successfully');
            this.dataProvider.shippingData=res["shipment_id"];
            this.router.navigate(['trackorder']);
          },
          (error)=>{
            this.paymentResponse= error;
            this.authService.presentToast(error.message+"\nPlease contact hello santa for to complete your order",7000);
            console.log('Error occured while completing shipment')
          }
          )
        },
        (error) => {
          this.paymentResponse = error;
          console.log('failed response', this.paymentResponse);
        }
      );
  }
}
