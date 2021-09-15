import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordType: boolean=true; 
  constructor(public authService:AuthService,public dataProvider:DataProvider,private afs: AngularFirestore,public router: Router,private formbuilder: FormBuilder,) {
    this.stepOne = this.formbuilder.group({
      email: this.email,
    });
    this.stepTwo = this.formbuilder.group({
      password: this.password,
      otp: this.otp,
    });
   }
  @ViewChild('slides', { static: true }) slides: IonSlides;
  windowRef: any;
  timeleft: number = 60;
  resendProgress: number = 1.0;
  signUpData: any = {};
  emailType: boolean = true;
  verificationCode: string;
  user: any;
  stepOne: FormGroup;
  stepTwo: FormGroup;
  stepThree: FormGroup;
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/),
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]);
  otp: FormControl = new FormControl('', [Validators.required]);
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false,
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.originalParams = Object.assign(
          swiper.originalParams,
          overwriteParams
        );
      },
      setTranslate() {
        const swiper = this;
        const { $, slides, rtlTranslate: rtl } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let progress = $slideEl[0].progress;
          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          const rotate = -180 * progress;
          let rotateY = rotate;
          let rotateX = 0;
          let tx = -offset$$1;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }

          $slideEl[0].style.zIndex =
            -Math.abs(Math.round(progress)) + slides.length;

          if (swiper.params.flipEffect.slideShadows) {
            // Set shadows
            let shadowBefore = swiper.isHorizontal()
              ? $slideEl.find('.swiper-slide-shadow-left')
              : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = swiper.isHorizontal()
              ? $slideEl.find('.swiper-slide-shadow-right')
              : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(
                `<div class="swiper-slide-shadow-${
                  swiper.isHorizontal() ? 'left' : 'top'
                }"></div>`
              );
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(
                `<div class="swiper-slide-shadow-${
                  swiper.isHorizontal() ? 'right' : 'bottom'
                }"></div>`
              );
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length)
              shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length)
              shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
          $slideEl.transform(
            `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          );
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, activeIndex, $wrapperEl } = swiper;
        slides
          .transition(duration)
          .find(
            '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left'
          )
          .transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          // eslint-disable-next-line
          slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;

            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    },
  };
  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber('+91' + this.email.value, appVerifier)
      .then((result) => {
        this.windowRef.confirmationResult = result;
        this.timeleft = 60;
        console.log('time left', this.timeleft);
        var downloadTimer = setInterval((dt) => {
          if (this.timeleft <= 0) {
            clearInterval(downloadTimer);
          }
          this.timeleft -= 1;
          this.resendProgress = this.timeleft / 60;
          console.log(this.timeleft, this.resendProgress);
        }, 1000);
      })
      .catch((error) => this.authService.presentToast(error.message,5000));
  }
  async emailLogin() {
    (this.signUpData['password'] = this.password.value), this.slides.slideTo(2);
    await this.authService.SignIn(this.signUpData.email, this.signUpData.password);
    this.dataProvider.showOverlay = false;
    alert(this.dataProvider.data)
    if (this.dataProvider.data=="error"){this.stepTwo.enable();}
  }
  verifyLoginCode() {
    this.dataProvider.showOverlay = true;
    this.windowRef.confirmationResult
      .confirm(this.otp.value)
      .then((result) => {
        this.signUpData['type'] = 'otp';
        (this.signUpData['phoneNumber'] = this.email.value),
          (this.signUpData['user'] = result.user),
          this.afs.collection('users').doc(result.user.uid).ref.get().then((doc:any) => {
            if (doc.exists){
              this.router.navigate(['']);
              this.authService.presentToast('Sign In successful');
              this.dataProvider.showOverlay = false;
            } else {
              this.authService.presentToast('You are not registered with this phone number.');
              this.dataProvider.showOverlay = false;
            }
          })
      })
      .catch((error) => {
        this.authService.presentToast('Incorrect OTP entered');
        this.stepTwo.enable();
        this.dataProvider.showOverlay = false;
      });
  }
  submitStepTwo() {
    this.stepOne.disable();
    this.stepTwo.disable();
    if (this.emailType) {
      this.emailLogin();
    } else {
      this.verifyLoginCode();
    }
  }
  onSubmit() {
    this.stepOne.disable();
    if (this.re.test(this.email.value)) {
      this.signUpData['type'] = 'email';
      (this.signUpData['email'] = this.email.value), this.slides.slideTo(1);
      this.stepTwo.removeControl('otp');
    } else {
      this.emailType = false;
      this.slides.slideTo(1);
      this.stepTwo.removeControl('password');
      this.sendLoginCode();
    }
  }
  ngOnInit() {
    this.dataProvider.showOverlay = false;
    this.windowRef = this.authService.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('submitSignup',{
      'size':'invisible',
      'callback':(result) => {
        this.onSubmit()
      }
    });
    this.windowRef.recaptchaVerifier.render();
  }

}
