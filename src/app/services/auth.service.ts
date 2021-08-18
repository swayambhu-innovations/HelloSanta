import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NavigationExtras, Router } from "@angular/router";
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { DataProvider } from '../providers/data.provider';
import { User, access } from './DataStructures';
import { ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { auditTime, filter, finalize, last, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  userAccessLevel: string;
  previousTotalUsers:number=0;
  userFireData:Observable<any>;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private homeDataProvider: DataProvider,
    public toastController: ToastController,
    private storage: AngularFireStorage,
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        this.afs.collection('users').doc(user.uid).valueChanges().subscribe((value:any)=>{
          localStorage.setItem('localUserData', JSON.stringify(value))
        })
        // alert("This is data user "+JSON.stringify(user));
        this.afs.doc(`users/${this.userData.uid}`).valueChanges().subscribe((value:any)=>{
          let level:any = JSON.stringify(value.access.accessLevel);
          if (level=='"Admin"'){
            
            localStorage.setItem("cache26328",JSON.stringify({"data":"fds7f6d7s8fysd89ffbSDSfydsfu9sdfsdg4t4s4t4"}))
          } else if (level=='"Vendor"'){
            if (value.access.levelData==undefined){
              let data = {
                accessLevel: value.access.accessLevel,
                levelData: {
                  totalCancelled: 0,
                  totalProducts: 0,
                  totalReturned: 0,
                  totalSold: 0,
                  totalOrders: 0,
                },
              }
              this.afs.doc(`users/${this.userData.uid}`).set({access:data},{merge:true})
            }

            localStorage.setItem("cache26328",JSON.stringify({"data":"dshdjhsusd9f87ds98fndsfnsduf4389t948nutfdsf"}))

          } else if (level=='"Customer"'){
            
            localStorage.setItem("cache26328",JSON.stringify({"data":"jfdjffue98eru98fu98jawejiqioepwqnfidscnufde"}))

          } else {
            console.log("Now access level found for level ",level);
          }
        });
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', '{}');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    })
    
  }
  public static dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' } as const;
  uploadFile(file,userName) {
    const filePath ="userAvatarImages/"+userName.toString()+"."+file.name.split('.').pop().toString();
    console.log("Starting file upload",filePath)
    const fileRef = this.storage.ref(filePath); 
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    return task.snapshotChanges().pipe(
      last(),
      switchMap(() => fileRef.getDownloadURL())
    )
  }
  userFireDataReturn(){
    return this.userFireData;
  };
  async presentToast(message,duration?) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  SignIn(email:string, password:string) {
    this.homeDataProvider.showOverlay=true;
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result:any) => {
        console.log(result)
        this.ngZone.run(() => {
          this.presentToast("Sign In successful")
          this.homeDataProvider.showOverlay=false;
          this.router.navigate([""]);
        });
        this.router.navigate([""]);
      }).catch((error:any) => {
        this.presentToast("An error occured "+error.toString(),5000)
      })
  }
  // Sign up with email/password
  SignUp(email:string, password:string,name:string,photo:string,dob?:Date) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(async (result:any) => {
        console.log("Starting email verification")
        this.SendVerificationMail();
        this.presentToast("Completing your registration");
        console.log("Download URl",this.downloadURL);
        console.log("Starting file upload ")
        this.uploadFile(photo,result.user.uid).subscribe((imageUrl)=>{
          console.log("Completed the imageurl ",imageUrl)
          this.SetUserData({user:result.user,displayName:name,photo:imageUrl,dob:dob});
          let today = new Date();
          var currentAccess:access={
            accessLevel:'Customer',
          }
          localStorage.setItem("localItem",JSON.stringify({
            uid:result.user.uid,
            email: result.user.email,
            displayName:name,
            photoURL: imageUrl,
            emailVerified: result.user.emailVerified,
            isAdmin:false,
            firstLogin:today.toLocaleDateString("en-US",AuthService.dateOptions).toString(),
            data:result.user.data || [],
            post:"Customer",
            presentToday:this.formatPresentToday(true),
            access:currentAccess,
          }))
          console.log("Completed the setUser data")
          this.router.navigate(['']);
        })
      }).catch((error:any) => {
        this.presentToast(error.message);
        console.log(error.message)
      })
  }

  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => {
      if (u!=null){
        u.sendEmailVerification();
      }else {
        console.error("An error occured");
      }
    })
    .then(() => {
      this.presentToast("Verification email sent to your email.");
      this.homeDataProvider.verifyEmail=true;
    })
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail:any) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      this.presentToast('Password reset email sent, check your inbox.');
    }).catch((error) => {
      this.presentToast(error)
    })
  }
  get isEmailVerified(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.emailVerified;
  }
  get userId():string{
    let a = JSON.parse(localStorage.getItem('user') || '{}').uid;
    this.afAuth.currentUser.finally().then((value)=>{a=value})
    return a;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
  get isJustLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== null && user.email!== undefined) ? true : false;
  }
  isUserAdmin(){
    console.log("IS admin fired",this.userId)
    this.afs.collection("users").doc(this.userId).valueChanges().subscribe((value) => {
      console.log(value);
    })
    console.log("-Ended-")
  }
  isAdmin():string{
    const user = JSON.parse(localStorage.getItem('localitem') || '{}');
    return user.post.toString();
  }
  GoogleAuth() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/user.birthday.read')
    provider.addScope('https://www.googleapis.com/auth/user.gender.read')
    return this.AuthLogin(provider);
  }  

  getUserData() {
    return JSON.parse(localStorage.getItem('user') || '{}')
  }

  getUserEmail(){
    const user = JSON.parse(localStorage.getItem('localUserData') || '{}');
    return (user !== null && user.email !== false) ? user.email : "";
  }

  getUserName(){
    const user = JSON.parse(localStorage.getItem('localUserData') || '{}');
    let username = (user !== null && user.displayName !== "") ? user.displayName : "Anonymous";
    return username
  }

  getUserPhoto(){
    const user = JSON.parse(localStorage.getItem('localUserData') || '{}');
    let photo = (user !== null && user.photoURL !== "") ? user.photoURL : "";
    return photo
  }

  // Auth logic to run auth providers
  AuthLogin(provider:any) {
    this.homeDataProvider.showOverlay=true;
    return this.afAuth.signInWithPopup(provider)
    .then((result:any) => {
      fetch(
        `https://people.googleapis.com/v1/people/${result.additionalUserInfo.profile.id}?personFields=birthdays,genders&access_token=${result.credential.accessToken}`
      ).then(response => {
        response.json().then((value) => {
          if (value.birthdays!=undefined){
            var date = new Date((
              value.birthdays[0].date.year+
              "-"+value.birthdays[0].date.month+
              "-"+value.birthdays[0].date.day).toString()
            );
            this.SetUserData({user:result.user,dob:date});
            console.log(date);
          }else{
            this.presentToast("Oops we don't know your birthday or your gender.");
            this.SetUserData({user:result.user});
          }
        });
        // window.alert("Auhtorisation successful ");
        this.presentToast("Auhtorisation Successful")
        this.router.navigate([""])
        this.homeDataProvider.showOverlay=false;
        console.log("Auth successful");
      }).catch((error:any) =>{
        this.presentToast(error)
        this.homeDataProvider.showOverlay=false;
      })
      console.log(result.user)
    }).catch((error:any) => {
      this.presentToast(error);
      this.homeDataProvider.showOverlay=false;
    })
  }
  
  formatPresentToday(val:boolean):string{
    if (val){
      let today  = new Date();
      return "1-"+(today.toLocaleDateString("en-US",AuthService.dateOptions).toString())
    }else{
      let today  = new Date();
      return "0-"+(today.toLocaleDateString("en-US",AuthService.dateOptions).toString())
    }
  }
  get getCurrenAccessLevel():string{
    let dt = JSON.parse(localStorage.getItem('cache26328') || '{}');
    if (dt.data=="fds7f6d7s8fysd89ffbSDSfydsfu9sdfsdg4t4s4t4"){
      return 'Admin'
    } else if (dt.data=="dshdjhsusd9f87ds98fndsfnsduf4389t948nutfdsf"){
      return 'Vendor'
    } else {
      return 'Customer'
    }
  }
  SetUserData(
    {
      user,
      displayName,
      photo,
      dob
    }:NamedParameters) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    // console.log("SetUSerData",user,displayName,photo)
    var currentAccess:access={
      accessLevel:'Customer',
    }
    let today  = new Date();
    if (displayName!=undefined || photo!=undefined){
      console.log("Set data true")
      var userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        photoURL: photo,
        emailVerified: user.emailVerified,
        isAdmin:false,
        firstLogin:today.toLocaleDateString("en-US",AuthService.dateOptions).toString(),
        data:user.data || [],
        access:currentAccess,
        isReferrer:user.isRefferrer || false,
        cartItems:user.cartItems || [],
        currentOrder:user.currentOrder || [],
        dob:user.dob || dob || undefined,
        friends:user.friends || [],
        orders:user.orders || [],
        referred:user.referred || [],
        referrer:user.refferrer || [],
        referral:user.referral || {},
        totalCashback:user.totalCashback || 0.0,
        totalOrders: user.totalOrders || 0,
        totalSalesPoints:user.totalSales || 0,
        wishlist: user.wishlist || [],
      }
    }else{
      console.log("Set data false")
      var userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        isAdmin:false,
        firstLogin:today.toLocaleDateString("en-US",AuthService.dateOptions).toString(),
        data:user.data || [],
        access:currentAccess,
        cartItems:user.cartItems || [],
        isReferrer:user.isRefferrer || false,
        currentOrder:user.currentOrder || [],
        dob:user.dob || dob,
        friends:user.friends || [],
        orders:user.orders || [],
        referred:user.referred || [],
        referrer:user.refferrer || [],
        referral:user.referral || {},
        totalCashback:user.totalCashback || 0.0,
        totalOrders: user.totalOrders || 0,
        totalSalesPoints:user.totalSales || 0,
        wishlist: user.wishlist || [],
      }
    }
    return userRef.set(userData, {
      merge: true
    })
    
  }

  SignOut() {
    // window.alert("Signing Out")
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('localItem')
      this.router.navigate(['Login']);
    })  
  }

}
interface NamedParameters{
  user:any,
  displayName?: string,
  photo?: string,
  dob?:Date
}