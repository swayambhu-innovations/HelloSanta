import { Injectable } from '@angular/core';
@Injectable()
export class DataProvider {
    public data: any;
    public signUpButton:boolean=false;
    public verifyEmail:boolean=false;
    public showOverlay:boolean=false;
    public reloadPage:boolean=false;
    public accessLevel:number=-1;
    public overlayStatus:string = "Loading...";
    public checkOutdata:any;
    public shippingData:any;
    public filter:any;
    public redirectURL:string = "";
    public logs:any= [];
    public getUrlParameter(sPageURL) {
        var sURLVariables = sPageURL.split('&');
        let data = {}
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            data[sParameterName[i].split('=')[0]] = sURLVariables[i].split('=')[1];
        }
        return data;
    }
    public constructor() { }
}