import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { SetupModalStepOneComponent } from 'src/app/modals/setup-modal-step-one/setup-modal-step-one.component';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-auth-sign-up',
  templateUrl: './auth-sign-up.component.html',
  styleUrls: ['./auth-sign-up.component.scss'],
})
export class AuthSignUpComponent implements OnInit {
  re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
  name: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/),
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]);
  otp: FormControl = new FormControl('', [Validators.required]);
  referralCode: FormControl = new FormControl('');
  dob: FormControl = new FormControl('', [Validators.required]);
  v_status: boolean = false;
  isLoading: boolean = false; // disable the submit button if loading
  img1: any;
  file: any;
  passwordType: boolean = true;
  @ViewChild('slides', { static: true }) slides: IonSlides;
  constructor(
    public authService: AuthService,
    private formbuilder: FormBuilder,
    public dataProvider: DataProvider,
    private activatedRoute: ActivatedRoute,
    public modalController: ModalController,
    public router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['referCode'] != undefined) {
        this.referralCode.setValue(params['referCode']);
      }
    });
    this.stepOne = this.formbuilder.group({
      email: this.email,
    });
    this.stepThree = this.formbuilder.group({
      name: this.name,
      dob: this.dob,
      referralCode: this.referralCode,
    });
    this.stepTwo = this.formbuilder.group({
      password: this.password,
      otp: this.otp,
    });
  }
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
  async presentModal() {
    const modal = await this.modalController.create({
      component: SetupModalStepOneComponent,
      cssClass: 'dialog',
    });
    await modal.present();
    await modal.onDidDismiss().then((data) => {
      return 'dismissed';
    });
  }
  logCaptcha() {
    // console.log(this.windowRef.recaptchaVerifier.verify());
    console.log(this.dob.value);
  }
  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.img1 = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]); // to trigger onload
    }
    let fileList: FileList = event.target.files;
    this.file = fileList[0];
    console.log(this.file);
  }
  async emailLogin() {
    (this.signUpData['password'] = this.password.value), this.slides.slideTo(2);
  }
  async finalSubmit() {
    this.stepOne.disable();
    this.stepTwo.disable();
    this.stepThree.disable(); // disable the stepOne if it
    let dob = new Date(this.dob.value);
    if (this.signUpData.type == 'email') {
      console.log(this.signUpData, this.name.value, this.file, dob);
      await this.authService.SignUp(
        this.signUpData.email,
        this.signUpData.password,
        this.name.value,
        this.file,
        dob
      );
      this.router.navigate(['']);
    } else if (this.signUpData.type == 'otp') {
      this.authService.SignUpWithNumber(
        this.signUpData.email,
        this.signUpData.user,
        this.name.value,
        dob,
        this.referralCode.value
      );
      this.router.navigate(['']);
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
  submitStepTwo() {
    this.stepOne.disable();
    this.stepTwo.disable();
    if (this.emailType) {
      this.emailLogin();
    } else {
      this.verifyLoginCode();
    }
  }
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
  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.otp.value)
      .then((result) => {
        this.signUpData['type'] = 'otp';
        (this.signUpData['phoneNumber'] = this.email.value),
          (this.signUpData['user'] = result.user),
          this.slides.slideTo(2);
        this.user = result.user;
      })
      .catch((error) => {
        this.authService.presentToast('Incorrect OTP entered');
        this.stepTwo.enable();
      });
  }
}
