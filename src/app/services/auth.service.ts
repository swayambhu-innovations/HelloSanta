import { Injectable, NgZone } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { NavigationExtras, Router } from '@angular/router';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { DataProvider } from '../providers/data.provider';
import { User, access } from './DataStructures';
import { ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  auditTime,
  filter,
  finalize,
  last,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  userAccessLevel: string;
  previousTotalUsers: number = 0;
  userFireData: Observable<any>;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private homeDataProvider: DataProvider,
    public toastController: ToastController,
    private storage: AngularFireStorage
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        // console.log("User data",user)
        this.afs
          .collection('users')
          .doc(user.uid)
          .valueChanges()
          .subscribe((value: any) => {
            if (value){localStorage.setItem('localUserData', JSON.stringify(value));}
          });
        // alert("This is data user "+JSON.stringify(user));
        this.afs
          .doc(`users/${this.userData.uid}`)
          .valueChanges()
          .subscribe((value: any) => {
            if (value) {
              let level: any = JSON.stringify(value.access.accessLevel);
              if (level == '"Admin"') {
                localStorage.setItem(
                  'cache26328',
                  JSON.stringify({
                    data: 'fds7f6d7s8fysd89ffbSDSfydsfu9sdfsdg4t4s4t4',
                  })
                );
              } else if (level == '"Vendor"') {
                if (value.access.levelData == undefined) {
                  let data = {
                    accessLevel: value.access.accessLevel,
                    levelData: {
                      totalCancelled: 0,
                      totalProducts: 0,
                      totalReturned: 0,
                      totalSold: 0,
                      totalOrders: 0,
                    },
                  };
                  this.afs
                    .doc(`users/${this.userData.uid}`)
                    .set({ access: data }, { merge: true });
                }

                localStorage.setItem(
                  'cache26328',
                  JSON.stringify({
                    data: 'dshdjhsusd9f87ds98fndsfnsduf4389t948nutfdsf',
                  })
                );
              } else if (level == '"Customer"') {
                localStorage.setItem(
                  'cache26328',
                  JSON.stringify({
                    data: 'jfdjffue98eru98fu98jawejiqioepwqnfidscnufde',
                  })
                );
              } else {
                // console.log('Now access level found for level ', level);
              }
            }
          });
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', '{}');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    });
  }
  public static dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  } as const;
  uploadFile(file, userName) {
    const filePath =
      'userAvatarImages/' +
      userName.toString() +
      '.' +
      file.name.split('.').pop().toString();
    // console.log('Starting file upload', filePath);
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    return task.snapshotChanges().pipe(
      last(),
      switchMap(() => fileRef.getDownloadURL())
    );
  }
  userFireDataReturn() {
    return this.userFireData;
  }
  sendResetEmail(email){
    this.afAuth.sendPasswordResetEmail(email)
    .then(() => {
      this.presentToast('Verification email sent to the address '+email,5000);
    })
    .catch(error => {
      this.presentToast(error.message || error,5000);
    })
  }
  async presentToast(message, duration?) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration || 2000,
    });
    toast.present();
  }
  SignIn(email: string, password: string) {
    this.homeDataProvider.showOverlay = true;
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        // console.log(result);
        this.ngZone.run(() => {
          this.presentToast('Sign In successful');
          this.homeDataProvider.showOverlay = false;
          this.homeDataProvider.reloadPage = true;
          this.router.navigate(['']);
        });
        this.homeDataProvider.reloadPage = true;
        this.router.navigate(['']);
      })
      .catch((error: any) => {
        this.presentToast('An error occured ' + error.toString(), 5000);
        this.homeDataProvider.showOverlay = false;
        this.homeDataProvider.data = "error"
      });
  }
  // Sign up with email/password
  SignUpWithNumber(number,user, name, dob, referralCode) {
    let today = new Date();
    var currentAccess: access = {
      accessLevel: 'Customer',
    };
    localStorage.setItem(
      'localItem',
      JSON.stringify({
        uid: user.uid,
        email: user.email || '',
        phoneNumber: user.phone_number || '',
        displayName: name || '',
        photoURL: './assets/profileDefault.png',
        emailVerified: user.emailVerified || '',
        isAdmin: false,
        firstLogin: today
          .toLocaleDateString('en-US', AuthService.dateOptions)
          .toString(),
        data: user.data || [],
        post: 'Customer',
        presentToday: this.formatPresentToday(true),
        access: currentAccess,
      })
    );
      this.SetUserData({user:user,displayName:name,phoneNumber:number,dob:dob,referralCode:referralCode});
  }
  SignUp(
    email: string,
    password: string,
    name: string,
    photo: string,
    dob?: Date,
    referralCode?: any
  ) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result: any) => {
        // console.log('Starting email verification');
        this.SendVerificationMail();
        this.presentToast('Completing your registration');
        // console.log('Download URl', this.downloadURL);
        // console.log('Starting file upload ');
        // console.log('Image file',photo);
        if (photo != undefined) {
          this.uploadFile(photo, result.user.uid).subscribe((imageUrl) => {
            // console.log('Completed the imageurl ', imageUrl);
            this.SetUserData({
              user: result.user,
              displayName: name,
              photo: imageUrl,
              dob: dob,
              referralCode: referralCode,
            });
            let today = new Date();
            var currentAccess: access = {
              accessLevel: 'Customer',
            };
            localStorage.setItem(
              'localItem',
              JSON.stringify({
                uid: result.user.uid,
                email: result.user.email || '',
                displayName: name || '',
                photoURL: imageUrl || '',
                emailVerified: result.user.emailVerified,
                isAdmin: false,
                firstLogin: today
                  .toLocaleDateString('en-US', AuthService.dateOptions)
                  .toString(),
                data: result.user.data || [],
                post: 'Customer',
                presentToday: this.formatPresentToday(true),
                access: currentAccess,
              })
            );
            // console.log('Completed the setUser data');
            this.homeDataProvider.reloadPage = true;
            this.router.navigate(['']);
          });
        } else {
          let imageUrl = './assets/profileDefault.png';
          this.SetUserData({
            user: result.user,
            displayName: name,
            photo: imageUrl,
            dob: dob,
            referralCode: referralCode,
          });
          let today = new Date();
          var currentAccess: access = {
            accessLevel: 'Customer',
          };
          localStorage.setItem(
            'localItem',
            JSON.stringify({
              uid: result.user.uid,
              email: result.user.email || '',
              displayName: name || '',
              photoURL: imageUrl || '',
              emailVerified: result.user.emailVerified,
              isAdmin: false,
              firstLogin: today
                .toLocaleDateString('en-US', AuthService.dateOptions)
                .toString(),
              data: result.user.data || [],
              post: 'Customer',
              presentToday: this.formatPresentToday(true),
              access: currentAccess,
            })
          );
          // console.log('Completed the setUser data');
          this.homeDataProvider.reloadPage = true;
          this.router.navigate(['']);
        }
      })
      .catch((error: any) => {
        this.presentToast(error.message);
        // console.log(error.message);
      });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u) => {
        if (u != null) {
          u.sendEmailVerification();
        } else {
          console.error('An error occured');
        }
      })
      .then(() => {
        this.presentToast('Verification email sent to your email.');
        this.homeDataProvider.verifyEmail = true;
      });
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail: any) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.presentToast('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        this.presentToast(error);
      });
  }
  get isNumberVerified(): boolean {
    if (this.isJustLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      return user.phoneNumber!=undefined ? true : false;
    } else {
      return false;
    }
  }
  get isEmailVerified() {
    if (this.isJustLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.emailVerified;
    } else {
      return false;
    }
  }
  get userId(): string {
    if (localStorage.getItem('user')){
      let a = JSON.parse(localStorage.getItem('user') || '{}').uid;
      this.afAuth.currentUser.finally().then((value) => {
        a = value;
      });
      return a;
    } else {
      return "Anonymous"
    }
    
  }
  get userDob(): Date {
    if (this.isJustLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.dob;
    } else {
      return new Date();
    }
    
  }
  get isLoggedIn(): boolean {
    if (localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user !== null && user.emailVerified !== false ? true : false;
    } else {
      false
    }
  }
  get isJustLoggedIn(): boolean {
    if (localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user !== null && user.email !== undefined ? true : false;
    } else {
      false
    }
  }
  isUserAdmin() {
    // console.log('IS admin fired', this.userId);
    this.afs
      .collection('users')
      .doc(this.userId)
      .valueChanges()
      .subscribe((value) => {
        // console.log(value);
      });
    // console.log('-Ended-');
  }
  isAdmin(): string {
    if (localStorage.getItem('localitem')){
      const user = JSON.parse(localStorage.getItem('localitem') || '{}');
      return user.post.toString();
    } else {
      return "Customer"
    }
  }
  GoogleAuth() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/user.birthday.read');
    provider.addScope('https://www.googleapis.com/auth/user.gender.read');
    return this.AuthLogin(provider);
  }
  FacebookAuth(){
    let provider = new firebase.auth.FacebookAuthProvider();
    let data = this.AuthLogin(provider)
    console.log(data);
    return data;
  }
  getUserData() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  getUserEmail() {
    if (localStorage.getItem('localUserData')){
      const user = JSON.parse(localStorage.getItem('localUserData') || '{}');
      return user !== null && user.email !== false ? user.email : '';
    } else {
      return ''
    }
  }
  get windowRef() {
    return window;
  }

  getUserName() {
    const user = JSON.parse(localStorage.getItem('localUserData') || '{}');
    let username =
      user !== null && user.displayName !== '' ? user.displayName : 'Anonymous';
    return username;
  }

  getUserPhoto() {
    if (this.isJustLoggedIn){
      const user = JSON.parse(localStorage.getItem('localUserData') || '{}');
      if (user.photoURL){
        return user.photoURL;
      } else if (user.photo){
        return user.photo;
      } else {
        return ''
      }
    } else {
      return ''
    }
  }
  getCurrentWishlist() {
    if (this.isJustLoggedIn){
      return JSON.parse(localStorage.getItem('localUserData') || '{}').wishlist;
    }
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    this.homeDataProvider.showOverlay = true;
    console.log('Provider', provider);
    if (provider.providerId=="google.com"){
      return this.afAuth
      .signInWithPopup(provider)
      .then((result: any) => {
        console.log("Success",result)
        fetch(
          `https://people.googleapis.com/v1/people/${result.additionalUserInfo.profile.id}?personFields=birthdays,genders&access_token=${result.credential.accessToken}`
        )
          .then((response) => {
            response.json().then(async (value) => {
              if (value.birthdays != undefined) {
                var date = new Date(
                  (
                    value.birthdays[0].date.year +
                    '-' +
                    value.birthdays[0].date.month +
                    '-' +
                    value.birthdays[0].date.day
                  ).toString()
                );
                await this.afs
                  .collection('users')
                  .doc(result.user.uid)
                  .ref.get()
                  .then((doc) => {
                    if (!doc.exists) {
                      this.SetUserData({
                        user: result.user,
                        dob: date,
                      });
                    }
                  });
                // console.log(date);
              } else {
                this.presentToast(
                  "Oops we don't know your birthday or your gender."
                );
                await this.afs
                  .collection('users')
                  .doc(result.user.uid)
                  .ref.get()
                  .then((doc) => {
                    if (!doc.exists) {
                      this.SetUserData({
                        user: result.user,
                      });
                    }
                  });
              }
            });
            // window.alert("Auhtorisation successful ");
            this.presentToast('Welcome to Hello Santa');
            this.homeDataProvider.reloadPage = true;
            this.router.navigate(['']);
            this.homeDataProvider.showOverlay = false;
            // console.log('Auth successful');
          })
          .catch((error: any) => {
            this.presentToast(error.message || error);
            this.homeDataProvider.showOverlay = false;
          });
        // console.log(result.user);
      })
      .catch((error: any) => {
        this.presentToast(error.message || error);
        this.homeDataProvider.showOverlay = false;
      });
    } else if (provider.providerId=="facebook.com") {
      return this.afAuth
      .signInWithPopup(provider)
      .then(async (result: any) => {
        console.log(result,"result facebook")
        this.presentToast(
          "Oops we don't know your birthday or your gender. You can add them later."
        );
        await this.afs
          .collection('users')
          .doc(result.additionalUserInfo.profile.id)
          .ref.get()
          .then((doc) => {
            if (!doc.exists) {
              let data = {
                uid:result.additionalUserInfo.profile.id,
                displayName:result.additionalUserInfo.profile.name,
                photo:result.additionalUserInfo.profile.picture.data.url,
                emailVerified:true,
                email:result.additionalUserInfo.profile.email,
              }
              this.SetUserData({
                user: data,
              });
            }
          });
        this.homeDataProvider.reloadPage = true;
        this.router.navigate(['']);
        this.homeDataProvider.showOverlay = false;
      })
      .catch((error: any) => {
        this.presentToast(error.message || error);
        this.homeDataProvider.showOverlay = false;
      });
    }
  }

  formatPresentToday(val: boolean): string {
    if (val) {
      let today = new Date();
      return (
        '1-' +
        today.toLocaleDateString('en-US', AuthService.dateOptions).toString()
      );
    } else {
      let today = new Date();
      return (
        '0-' +
        today.toLocaleDateString('en-US', AuthService.dateOptions).toString()
      );
    }
  }
  get getCurrenAccessLevel(): string {
    let dt = JSON.parse(localStorage.getItem('cache26328') || '{}');
    if (dt.data == 'fds7f6d7s8fysd89ffbSDSfydsfu9sdfsdg4t4s4t4') {
      return 'Admin';
    } else if (dt.data == 'dshdjhsusd9f87ds98fndsfnsduf4389t948nutfdsf') {
      return 'Vendor';
    } else {
      return 'Customer';
    }
  }
  SetUserData({
    user,
    displayName,
    photo,
    dob,
    phoneNumber,
    referralCode,
  }: NamedParameters) {
    console.log('SetUserData', user);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    // // console.log("SetUSerData",user,displayName,photo)
    var currentAccess: access = {
      accessLevel: 'Customer',
    };
    let today = new Date();
    if (displayName != undefined || photo != undefined) {
      // console.log('Set data true');
      var userData: User = {
        uid: user.uid,
        email: user.email || '',
        phoneNumber: phoneNumber || '',
        displayName: user.name || displayName || '',
        photoURL: user.photo || photo || './assets/profileDefault.png',
        emailVerified: user.emailVerified || false,
        isAdmin: false,
        haveReferred:false,
        firstLogin: today
          .toLocaleDateString('en-US', AuthService.dateOptions)
          .toString(),
        data: user.data || [],
        access: currentAccess,
        isReferrer: user.isRefferrer || false,
        currentOrder: user.currentOrder || [],
        dob: user.dob || dob || today.toDateString(),
        friends: user.friends || [],
        orders: user.orders || [],
        referred: user.referred || [],
        referrer: user.refferrer || [],
        referral: user.referral || {},
        totalCashback: 51,
        totalOrders: user.totalOrders || 0,
        totalSalesPoints: user.totalSales || 0,
        wishlist: user.wishlist || [],
      };
    } else {
      // console.log('Set data false');
      var userData: User = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || './assets/profileDefault.png',
        emailVerified: user.emailVerified || false,
        isAdmin: false,
        haveReferred:false,
        firstLogin: today
          .toLocaleDateString('en-US', AuthService.dateOptions)
          .toString(),
        data: user.data || [],
        phoneNumber: phoneNumber || '',
        access: currentAccess,
        isReferrer: user.isRefferrer || false,
        currentOrder: user.currentOrder || [],
        dob: user.dob || dob || today.toDateString(),
        friends: user.friends || [],
        orders: user.orders || [],
        referred: user.referred || [],
        referrer: user.refferrer || [],
        referral: user.referral || {},
        totalCashback: 51,
        totalOrders: user.totalOrders || 0,
        totalSalesPoints: user.totalSales || 0,
        wishlist: user.wishlist || [],
      };
    }
    console.log("userData",userData);
    userRef.set(userData, {
      merge: true,
    });
    if (referralCode != undefined) {
      this.afs
        .collection('users')
        .valueChanges()
        .subscribe((result: any) => {
          result.forEach((val: any) => {
            if (referralCode == val.referralCode && val.haveReferred == false) {
              this.afs
                .collection('users')
                .doc(val.uid)
                .set({
                  totalCashback: firebase.firestore.FieldValue.increment(10),
                  haveReferred: true,
                },{merge:true});
            }
          });
        });
    }
    this.presentToast('Welcome &#128512; to Hello Santa');
    this.homeDataProvider.reloadPage = true;
    this.router.navigate(['']);
  }

  SignOut() {
    // window.alert("Signing Out")
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('localUserData');
      localStorage.removeItem('cache26328');
      this.router.navigate(['login']);
    });
  }
}
interface NamedParameters {
  user: any;
  displayName?: string;
  photo?: string;
  dob?: Date;
  referralCode?: string;
  phoneNumber?: string;
}
