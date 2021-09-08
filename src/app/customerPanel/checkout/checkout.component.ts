import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { InvoiceDetailComponent } from 'src/app/modals/invoice-detail/invoice-detail.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { PaymentService } from 'src/app/services/payment.service';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/app';
import { AngularFireAnalytics } from '@angular/fire/analytics';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  dataCopy;
  constructor(
    private afs: AngularFirestore,
    public dataProvider: DataProvider,
    private paymentService: PaymentService,
    private changeRef: ChangeDetectorRef,
    private authService: AuthService,
    private formbuilder: FormBuilder,
    private inventoryService: InventoryService,
    private router: Router,
    private analytics: AngularFireAnalytics,
    public modalController: ModalController
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
      message: this.message,
      santaCredit: this.santaCredit,
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
  santaCredit: FormControl = new FormControl(false, [Validators.required]);
  message: FormControl = new FormControl('', [
    Validators.minLength(10),
    Validators.maxLength(100),
  ]);
  orders = [];
  objectKeys = Object.keys;
  quantity = 1;
  offerFlat: number = 0;
  payableAmount = 0;
  WindowRef: any;
  processingPayment: boolean;
  paymentResponse: any = {};
  orderItems = [];
  santaCoins: number = 0;
  imageRequired: any = [];
  imagesValid: boolean = false;
  log(data) {
    console.log(data);
  }
  addImage(event) {
    console.log('event Image', event);
    let allValid = true;
    this.imageRequired.forEach((data, index) => {
      if (data.productId == event.productId) {
        this.imageRequired[index].imageReference = event.image;
      }
      if (data.imageRequired == undefined) {
        allValid = false;
      }
    });
    this.imagesValid = allValid;
    console.log('imageRequired', this.imageRequired);
  }
  async presentInvoice() {
    const modal = await this.modalController.create({
      component: InvoiceDetailComponent,
      cssClass: 'invoiceModal',
    });
    return await modal.present();
  }

  get grandTotal(): number {
    var total = 0;
    this.dataCopy.forEach((order) => {
      total += order.price * order.quantity;
    });
    return total - this.offerFlat;
  }
  get grandHeight(): number {
    var total = 0;
    this.orders.forEach((order) => {
      total += order.finalPrice;
    });
    return total;
  }
  setCashback(event) {
    if (event.detail.checked) {
      this.offerFlat = this.santaCoins;
    } else {
      this.offerFlat = 0;
    }
  }
  ngOnInit() {
    this.dataProvider.showOverlay = false;
    this.inventoryService
      .getUserInfo()
      .ref.get()
      .then((user: any) => {
        this.santaCoins = user.data().totalCashback;
      });
    if (this.dataProvider.checkOutdata) {
      this.dataCopy = this.dataProvider.checkOutdata;
      this.dataProvider.checkOutdata.forEach((prod) => {
        var docRef = this.afs.collection('products').ref.doc(prod.productData);
        docRef.get().then((data) => {
          if (data.exists) {
            console.log('Document data:', data);
            let dat: any = data.data();
            if (dat.imageReference) {
              this.imagesValid = false;
              this.imageRequired.push({
                productId: dat.productId,
                imageReference: undefined,
              });
            }
            this.orderItems.push({
              name: dat.productName,
              sku: prod.productData,
              units: 1,
              selling_price: prod.price - this.offerFlat,
            });
            dat['finalPrice'] = prod.price;
            dat['selections'] = prod.extrasData;
            dat['quantity'] = prod.quantity;
            this.orders.push(dat);
          } else {
            console.log('No such document!');
          }
        });
      });
      this.WindowRef = this.paymentService.WindowRef;
    } else {
      this.authService.presentToast('Oh Ohh! Checkout expired &#x1F605;');
      this.router.navigate(['']);
    }
  }
  proceedToPay($event) {
    if (this.imagesValid) {
      this.dataProvider.showOverlay = true;
      this.processingPayment = true;
      this.payableAmount = this.grandTotal * 100;
      console.log('payable amount', this.payableAmount);
      this.initiatePaymentModal($event);
      this.analytics.logEvent('Checkout');
    } else {
      this.authService.presentToast('Please add all images by pressing Choose a file on every product.');
    }
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
        this.processingPayment = false;
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
        name:
          this.form.get('firstName')!.value.toString() +
          this.form.get('lastName')!.value.toString(),
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
          if (this.offerFlat > 0) {
            this.inventoryService.updateUserData({ totalCashback: 0 });
          }
          this.paymentResponse = res;
          this.changeRef.detectChanges();
          console.log('success response', this.paymentResponse);
          const shippingDetail = {
            order_id: `Order#${
              Math.floor(Math.random() * 5123435345 * 43) + 10
            }`,
            billing_customer_name: this.form.get('firstName')!.value,
            billing_last_name: this.form.get('lastName')!.value,
            billing_city: this.form.get('city')!.value,
            billing_pincode: this.form.get('pincode')!.value,
            billing_state: this.form.get('state')!.value,
            billing_country: this.form.get('country')!.value,
            billing_email: this.form.get('email')!.value,
            billing_phone: this.form.get('phoneNumber')!.value,
            billing_address: this.form.get('addressLine1')!.value,
            order_items: this.orderItems,
            payment_method: 'Prepaid',
            sub_total: this.grandTotal,
            length: 1,
            height: 1,
            weight: 1,
            breadth: 1,
          };
          console.log('shippingDetail', shippingDetail);
          this.paymentService.shipOrder(shippingDetail).subscribe(
            (res: any) => {
              this.authService.presentToast('Payment Successful &#x1F60A;');
              console.log('shipping Confirmed Detail', res);
              let currentOrder = {
                shippingDetail: res.body,
                products: this.orders,
                orderStage: 'live',
                orderId: res.body.order_id,
                shipment_id: res.body.shipment_id,
                orderConfirmed: false,
                orderMessage: this.message.value || '',
              };
              this.inventoryService.addUserOrder(currentOrder);
              this.dataProvider.shippingData =
                currentOrder.shippingDetail.shipment_id.toString();
              this.authService.presentToast('Order Placed Successfully ');
              this.router.navigateByUrl(
                'trackorder?shippingId=' +
                  currentOrder.shippingDetail.shipment_id.toString()
              );
            },
            (error) => {
              this.paymentResponse = error;
              this.authService.presentToast(
                error.message +
                  '\nPlease contact hello santa, to complete your order',
                7000
              );
              console.log('Error occured while completing shipment');
            }
          );
        },
        (error) => {
          this.paymentResponse = error;
          console.log('failed response', this.paymentResponse);
        }
      );
  }
}
