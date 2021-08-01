import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { SetupModalStepOneComponent } from 'src/app/modals/setup-modal-step-one/setup-modal-step-one.component';


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
  photo: FormControl = new FormControl("", [Validators.required])
  confirmPassword:FormControl = new FormControl("", [Validators.required])
  v_status: boolean = false;
  isLoading: boolean = false; // disable the submit button if loading
  img1:any;
  file:any;
  constructor(
    public authService:AuthService,
    private formbuilder: FormBuilder,
    public dataProvider:DataProvider,
    public modalController: ModalController,) {
    this.form = this.formbuilder.group({
      name: this.name,
      email: this.email,
      password:this.password,
      photo:this.photo,
      confirmPassword:this.confirmPassword,
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });
   }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SetupModalStepOneComponent,
      cssClass:"dialog"
    });
    return await modal.present();
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


   MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }


  onSubmit() {
    if (this.form.status == "VALID") {
      this.form.disable(); // disable the form if it's valid to disable multiple submissions
      var formData: any = new FormData();
      formData.append("name", this.form.get("name")!.value);
      formData.append("email", this.form.get("email")!.value);
      formData.append("password", this.form.get("password")!.value);
      formData.append("photo", this.form.get("photo")!.value);
      this.isLoading = true; // sending the post request async so it's in progress
      console.log(formData);
      this.presentModal();
      this.authService.SignUp(
        this.form.get("email").value,
        this.form.get("password").value,
        this.form.get("name").value,
        this.file,
        this.dataProvider.data,
      )
      this.isLoading = false;
      this.form.enable()
    }
  }


  ngOnInit() {}

}
