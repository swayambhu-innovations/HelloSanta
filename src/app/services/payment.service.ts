
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private https: HttpClient,
    private firebaseFunction:AngularFireFunctions,
    private authService:AuthService
  ) { }

  get WindowRef() {
    return window;
  }

  checkShipmentDetail(shipmentId){
    return this.firebaseFunction.httpsCallable('checkOrderShipment')({shipmentId:shipmentId,uid:this.authService.userId});
    // return this.https.post(environment.cloudFunctions.checkOrderShipment, {shipmentId:shipmentId,uid:this.authService.userId});
  }
  
  createOrder(orderDetails) {
    orderDetails.uid = this.authService.userId;
    // return this.firebaseFunction.httpsCallable('createOrder')(orderDetails);
    return this.https.post(environment.cloudFunctions.createOrder, orderDetails);
  }

  capturePayment(paymentDetails) {
    paymentDetails.uid = this.authService.userId;
    // return this.firebaseFunction.httpsCallable('capturePayment')(paymentDetails);
    return this.https.post(environment.cloudFunctions.capturePayment,paymentDetails);
  }

  shipOrder(orderDetails) {
    orderDetails.uid = this.authService.userId;
    // return this.firebaseFunction.httpsCallable('shipOrder')(orderDetails);
    return this.https.post(environment.cloudFunctions.shipOrder, orderDetails);
  }

  cancelOrderShipment(shipmentIds){
    shipmentIds.uid = this.authService.userId;
    return this.https.post(environment.cloudFunctions.cancelOrderShipment, shipmentIds);
  }
}