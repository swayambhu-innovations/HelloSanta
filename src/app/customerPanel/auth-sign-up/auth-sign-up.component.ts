import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { SetupModalStepOneComponent } from 'src/app/modals/setup-modal-step-one/setup-modal-step-one.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-auth-sign-up',
  templateUrl: './auth-sign-up.component.html',
  styleUrls: ['./auth-sign-up.component.scss'],
})
export class AuthSignUpComponent implements OnInit {
  form: FormGroup;
  name: FormControl = new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  password: FormControl = new FormControl("", [Validators.required, Validators.minLength(10)])
  referralCode:FormControl = new FormControl("",)
  v_status: boolean = false;
  isLoading: boolean = false; // disable the submit button if loading
  img1:any;
  file:any;
  constructor(
    public authService:AuthService,
    private formbuilder: FormBuilder,
    public dataProvider:DataProvider,
    private activatedRoute: ActivatedRoute,
    public modalController: ModalController,
    public router: Router,
    ) {
      this.activatedRoute.queryParams.subscribe(params => {
        if (params['referCode']!=undefined) {
          this.referralCode.setValue(params['referCode']);
        }
      });
    this.form = this.formbuilder.group({
      name: this.name,
      email: this.email,
      password:this.password,
      referralCode:this.referralCode,
    });
   }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SetupModalStepOneComponent,
      cssClass:"dialog"
    });
    await modal.present();
    await modal.onDidDismiss().then(data => {
      return "dismissed";
    });
  }

   fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.img1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    let fileList: FileList = event.target.files;  
    this.file = fileList[0];
    console.log(this.file);
  }



  async onSubmit() {
    if (this.form.status == "VALID") {
      this.form.disable(); // disable the form if it's valid to disable multiple submissions
      this.dataProvider.showOverlay=true;
      var formData: any = new FormData();
      formData.append("name", this.form.get("name")!.value);
      formData.append("email", this.form.get("email")!.value);
      formData.append("password", this.form.get("password")!.value);
      formData.append("photo", this.form.get("photo")!.value);
      this.isLoading = true; // sending the post request async so it's in progress
      console.log(formData);
      await this.presentModal();
      if (this.dataProvider.data!=undefined){
        await this.authService.SignUp(
          this.form.get("email").value,
          this.form.get("password").value,
          this.form.get("name").value,
          this.file,
          this.dataProvider.data,
        )
      } else {
        console.log("dataprovider undefined", this.dataProvider.data)
      }
      this.isLoading = false;
      this.dataProvider.showOverlay=false;
      this.form.enable()
    }
  }


  ngOnInit() {this.dataProvider.showOverlay=false;}

}
