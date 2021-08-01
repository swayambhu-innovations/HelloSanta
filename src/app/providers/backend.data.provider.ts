import { Injectable } from '@angular/core';
@Injectable()
export class BackendDataProvider {
    public accessLevel:number=-1;
    public isAdmin:boolean=false;
    public isVendor:boolean=false;
    public isCustomer:boolean=false;
    public carItems:number=0;
    public constructor() { }
}