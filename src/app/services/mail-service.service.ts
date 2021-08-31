import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailServiceService {

  constructor(private http: HttpClient) { }
  sendMail(body,subject,mail){
    console.log(body,subject,mail,"triggered mail service");
    return this.http.post(environment.cloudFunctions.sendMail, {subject:subject,content:body, email:mail});
  }
}
