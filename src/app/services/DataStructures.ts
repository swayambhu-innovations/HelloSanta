
export interface PresentToday{
    day:string,
    present:boolean,
    arriveTime:string,
    departTime:string,
}

export interface access{
    accessLevel:'Admin'| 'Vendor' | 'Customer' | 'Unregistered',
    teamAccess?:Array<String>[];
}

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    isAdmin:boolean;
    data:[];
    firstLogin:string,
    access:access,
    cartItems:[],
    isReferrer:boolean,
    totalSalesPoints:number,
    referred:[],
    referrer:{},
    referral:{},
    totalOrders:number,
    totalCashback:number,
    orders:[],
    wishlist:[],
    dob:Date,
    currentOrder:[],
    friends:[],
}




