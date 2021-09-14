
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
    private http: HttpClient,
    private firebaseFunction:AngularFireFunctions,
    private authService:AuthService
  ) { }

  get WindowRef() {
    return window;
  }

  checkShipmentDetail(shipmentId){
    // return this.firebaseFunction.httpsCallable('checkOrderShipment')(shipmentId);
    return this.http.post(environment.cloudFunctions.checkOrderShipment, {shipmentId:shipmentId,uid:this.authService.userId});
  }
  
  createOrder(orderDetails) {
    orderDetails.uid = this.authService.userId;
    return this.http.post(environment.cloudFunctions.createOrder, orderDetails);
  }

  capturePayment(paymemntDetails) {
    paymemntDetails.uid = this.authService.userId;
    return this.http.post(environment.cloudFunctions.capturePayment,paymemntDetails);
  }

  shipOrder(orderDetails) {
    orderDetails.uid = this.authService.userId;
    return this.http.post(environment.cloudFunctions.shipOrder, orderDetails);
  }

  cancelOrderShipment(shipmentIds){
    shipmentIds.uid = this.authService.userId;
    return this.http.post(environment.cloudFunctions.cancelOrderShipment, shipmentIds);
  }
}