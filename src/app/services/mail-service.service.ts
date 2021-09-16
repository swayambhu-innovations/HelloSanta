import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AngularFireFunctions } from '@angular/fire/functions';
@Injectable({
  providedIn: 'root'
})
export class MailServiceService {

  constructor(private http: HttpClient,private firebaseFunction:AngularFireFunctions,) { }
  sendMail(body,subject,mail){
    console.log(body,subject,mail,"triggered mail service");
    return this.firebaseFunction.httpsCallable('sendMail')({subject:subject,content:body, email:mail})
    // return this.http.post(environment.cloudFunctions.sendMail, {subject:subject,content:body, email:mail});
  }
}
