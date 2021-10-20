import { ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
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
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { InvoiceService } from 'src/app/services/invoice.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { last, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  screenwidth = window.innerWidth;
  dataCopy;
  searchingCoupon: boolean = false;
  states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttarakhand',
    'Uttar Pradesh',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Lakshadweep',
    'Puducherry',
  ];
  constructor(
    private afs: AngularFirestore,
    public dataProvider: DataProvider,
    private paymentService: PaymentService,
    private changeRef: ChangeDetectorRef,
    private authService: AuthService,
    private formbuilder: FormBuilder,
    private inventoryService: InventoryService,
    private router: Router,
    private storage: AngularFireStorage,
    private analytics: AngularFireAnalytics,
    public modalController: ModalController,
    private invoiceService: InvoiceService,
    private location: Location
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
      message: this.message,
      santaCredit: this.santaCredit,
    });
  }
  form: FormGroup;
  firstName: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  lastName: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  email: FormControl = new FormControl('', [
    Validators.required,
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
    Validators.minLength(1),
  ]);
  city: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  pincode: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
    Validators.minLength(6),
    Validators.maxLength(6),
  ]);
  state: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  santaCredit: FormControl = new FormControl(false, [Validators.required]);
  message: FormControl = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(2000),
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
  coupons: any = [];
  discount: number = 0;
  totalTax: number = 0;
  subTotal: number = 0;
  couponData: any = { available: false };
  maxiumumDiscountReached: boolean = false;
  log(data) {
    console.log(data);
  }
  couponCodeChanged(event) {
    if (event.checked == false) {
      this.couponData.available = false;
      this.couponData = {};
    }
  }
  searchCoupon(event) {
    this.searchingCoupon = true;
    // console.log("coupon",event);
    let defined = false;
    this.coupons.forEach((coupon) => {
      // console.log("Checking coupon",event.detail.value.toLowerCase()==coupon.code.toLowerCase())
      if (event.detail.value.toLowerCase() == coupon.code.toLowerCase()) {
        if (this.dataProvider.checkOutdata.length >= coupon.minimumProducts) {
          if (this.grandTotal >= coupon.minimumPrice) {
            defined = true;
            this.couponData = {
              available: true,
              code: coupon.code,
              discount: coupon.cost,
              type: coupon.type,
              title: coupon.name,
              maximumDiscount: coupon.maximumDiscount,
            };
            this.discount = coupon.cost;
            // console.log("Coupon Found")
          }
        }
      }
    });
    if (!defined) {
      this.couponData = {
        available: false,
      };
      this.discount = 0;
    }
    this.searchingCoupon = false;
  }
  addImage(event) {
    let allValid = true;
    this.imageRequired.forEach((data, index) => {
      if (data.ref == event.refData) {
        this.imageRequired[index].imageReference = event.image;
      }
      if (data.imageReference == undefined) {
        allValid = false;
      }
    });
    this.imagesValid = allValid;
  }
  presentInvoice() {
    let detail = {
      name: this.firstName.value + ' ' + this.lastName.value,
      address: this.addressLine1.value,
      city: this.city.value,
      state: this.state.value,
      country: 'India',
      pincode: this.pincode.value,
      mobile: this.phoneNumber.value,
      email: this.email.value,
      discount: this.couponData,
      subTotal: this.grandTotal - this.totalTax,
      grandTotal: this.grandTotal,
      taxCharges: this.totalTax,
    };
    this.invoiceService.createInvoice(this.orders, detail);
  }

  get grandTotal(): number {
    if (this.dataCopy) {
      if (this.dataCopy.length > 0) {
        var total = 0;
        var offer = 0;
        this.totalTax = 0;
        this.subTotal = 0;
        this.dataCopy.forEach((order) => {
          total += order.price * order.quantity;
          this.totalTax += (total / 100) * 15;
        });
        if (this.couponData.available) {
          if (this.couponData.type == 'percent') {
            offer = ((total / 100) * this.couponData.discount);
          } else {
            offer = (this.couponData.discount);
          }
          if (offer > this.couponData.maximumDiscount) {
            this.maxiumumDiscountReached = true;
            offer = this.couponData.maximumDiscount;
          }
        }
        offer = offer + this.offerFlat;
        return total-offer;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  setCashback(event) {
    if (event.detail.checked) {
      this.offerFlat = this.santaCoins;
    } else {
      this.offerFlat = 0;
    }
  }
  makeid(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  ngOnInit() {
    if (this.dataProvider.checkOutdata <= 0) {
      this.router.navigate(['']);
    } else {
      this.dataProvider.showOverlay = false;
      this.inventoryService
        .getUserInfo()
        .ref.get()
        .then((user: any) => {
          this.santaCoins = user.data().totalCashback;
        });
      if (this.dataProvider.checkOutdata) {
        this.dataCopy = this.dataProvider.checkOutdata;
        if (this.dataCopy != undefined && this.dataCopy != []) {
          this.dataProvider.checkOutdata.forEach((prod) => {
            var docRef = this.afs
              .collection('products')
              .ref.doc(prod.productData);
            docRef.get().then((data) => {
              if (data.exists) {
                let dat: any = data.data();
                if (dat.imageReference) {
                  this.imagesValid = false;
                  this.imageRequired.push({
                    productId: dat.productId,
                    ref: prod.identifier,
                    imageReference: undefined,
                  });
                }
                this.orderItems.push({
                  name: dat.productName,
                  sku: prod.productData + this.makeid(7).toString(),
                  units: 1,
                  selling_price: prod.price - this.offerFlat,
                });
                dat['finalPrice'] = prod.price;
                dat['selections'] = prod.extrasData;
                dat['quantity'] = prod.quantity;
                dat['ref'] = prod.identifier;
                let config = [];
                for (let key of Object.keys(dat.selections)) {
                  let selection = dat.selections[key];
                  if (
                    selection.type == 'textSel' ||
                    selection.type == 'imgSel'
                  ) {
                    config.push({
                      title: selection.sectionTitle,
                      value: selection.title,
                    });
                  } else if (selection.type == 'faceCount') {
                    config.push({ title: 'Faces', value: selection.faces });
                  }
                }
                dat['config'] = config;
                this.orders.push(dat);
              } else {
                this.authService.presentToast(
                  'Product not found on our databases. Please retry'
                );
                this.router.navigate(['']);
              }
            });
          });
          this.WindowRef = this.paymentService.WindowRef;
          this.afs
            .collection('offers')
            .ref.get()
            .then((offers) => {
              offers.forEach((offer) => {
                this.coupons.push(offer.data());
              });
            });
        } else {
          this.authService.presentToast('Something is wrong. Please retry.');
          this.router.navigate(['']);
        }
      } else {
        this.authService.presentToast('Oh Ohh! Checkout expired &#x1F605;');
        this.router.navigate(['']);
      }
    }
  }
  uploadFile(file, userName) {
    const filePath =
      'referenceImage/' + `${userName}/` + userName.toString() + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    return task.snapshotChanges().pipe(
      last(),
      switchMap(() => fileRef.getDownloadURL())
    );
  }
  async proceedToPay($event) {
    if (this.imagesValid || this.imageRequired.length == 0) {
      this.dataProvider.showOverlay = true;
      this.processingPayment = true;
      this.payableAmount = this.grandTotal * 100;
      // console.log('payable amount', this.payableAmount);
      this.initiatePaymentModal($event);
      this.analytics.logEvent('Checkout');
    } else {
      this.authService.presentToast(
        'Please add all images by pressing Choose a file on every product.'
      );
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
        var rzp1 = new this.WindowRef.Razorpay(
          this.preparePaymentDetails(order)
        );
        this.processingPayment = false;
        rzp1.open();
        event.preventDefault();
      },
      (error) => {
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
      image: 'https://hellosanta.in/assets/icon.png',
      handler: function (response) {
        ref.handlePayment(response);
      },
      prefill: {
        name:
          this.form.get('firstName')!.value.toString() +
          this.form.get('lastName')!.value.toString(),
        email: this.form.get('email')!.value,
        contact: '+91' + this.form.get('phoneNumber')!.value,
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
          // console.log('success response', this.paymentResponse);
          const shippingDetail = {
            order_id: `Order#${
              Math.floor(Math.random() * 5123435345 * 43) + 10
            }`,
            billing_customer_name: this.form.get('firstName')!.value,
            billing_last_name: this.form.get('lastName')!.value,
            billing_city: this.form.get('city')!.value,
            billing_pincode: this.form.get('pincode')!.value,
            billing_state: this.form.get('state')!.value,
            billing_country: 'India',
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
          // console.log('shippingDetail', shippingDetail);
          this.paymentService.shipOrder(shippingDetail).subscribe(
            (res: any) => {
              this.authService.presentToast('Payment Successful &#x1F60A;');
              let detail = {
                name: this.firstName.value + ' ' + this.lastName.value,
                address: this.addressLine1.value,
                city: this.city.value,
                state: this.state.value,
                country: 'India',
                pincode: this.pincode.value,
                mobile: this.phoneNumber.value,
                email: this.email.value,
                discount: this.couponData,
                subTotal: this.grandTotal - this.totalTax,
                grandTotal: this.grandTotal,
                taxCharges: this.totalTax,
              };
              this.invoiceService.createInvoice(this.orders, detail);
              console.log('shipping Confirmed Detail', res);
              if (res.res.statusCode == 200) {
                let currentOrder = {
                  shippingDetail: res.body,
                  products: this.orders,
                  orderStage: 'live',
                  orderId: res.body.order_id,
                  shipment_id: res.body.shipment_id,
                  orderConfirmed: false,
                  grandTotal: this.grandTotal,
                  orderMessage: this.message.value || '',
                };
                console.log('currentOrder', currentOrder);
                this.inventoryService.addUserOrder(currentOrder);
                this.presentInvoice();
                this.dataProvider.shippingData =
                  currentOrder.shippingDetail.shipment_id.toString();
                if (this.dataProvider.data.type == 'cart') {
                  this.inventoryService.clearCart();
                }
                this.authService.presentToast('Order Placed Successfully ');
                this.router.navigateByUrl(
                  'feedback?trackId=' +
                    res.body.shipment_id.toString() +
                    '&orderId=' +
                    res.body.order_id
                );
              } else {
                console.log('error response', res);
                this.authService.presentToast(res.body.error.message);
              }
            },
            (error) => {
              this.paymentResponse = error;
              this.authService.presentToast(
                error.message +
                  '\nPlease contact hello santa, to complete your order',
                7000
              );
              // console.log('Error occured while completing shipment');
            }
          );
        },
        (error) => {
          this.paymentResponse = error;
          // console.log('failed response', this.paymentResponse);
        }
      );
  }
}
