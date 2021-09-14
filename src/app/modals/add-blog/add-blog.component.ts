import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { last, switchMap } from 'rxjs/operators';
import { DataProvider } from 'src/app/providers/data.provider';
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss'],
})
export class AddBlogComponent implements OnInit {
  constructor(
    public inventoryService: InventoryService,
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private storage: AngularFireStorage,
    public dataProvider: DataProvider
  ) {
    this.form = this.formbuilder.group({
      blogName: this.blogName,
      blogContent: this.blogContent,
      blogImage: this.blogImage,
      blogExcerpt: this.blogExcerpt,
      blogTags: this.blogTags,
      blogDate: this.blogDate,
      blogPublish: this.blogPublish,
      mainBlog: this.mainBlog,
    });
  }
  isLoading: boolean = false;
  imageEvent: any = undefined;
  form: FormGroup;
  blogName: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  blogExcerpt: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(300),
  ]);
  blogTags: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('[a-zA-Z,0-9 ]*'),
  ]);
  blogDate: FormControl = new FormControl('', [Validators.required]);
  blogContent: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(300),
  ]);
  blogImage: FormControl = new FormControl('', [Validators.required]);
  blogPublish: FormControl = new FormControl(false);
  mainBlog: FormControl = new FormControl(false);
  uploadFile(file, fileName) {
    console.log('Starting file upload', fileName);
    const fileRef = this.storage.ref(fileName);
    const task = this.storage.upload(fileName, file);
    return task.snapshotChanges().pipe(
      last(),
      switchMap(() => fileRef.getDownloadURL())
    );
  }
  getFileFromEvent(event) {
    let fileList: FileList = event.target.files;
    return fileList[0];
  }
  loadFile(event, count) {
    var image = document.getElementById(count) as HTMLImageElement;
    image.src = URL.createObjectURL(event.target.files[0]);
    if (event.target.files[0].size > 1000000) {
      this.authService.presentToast('File is greater than 1 MB');
      event.target.value = '';
    } else {
      image.src = URL.createObjectURL(event.target.files[0]);
      this.imageEvent = event;
    }
  }
  addBlog() {
    this.dataProvider.showOverlay=true;
    this.form.disable()
    this.isLoading=true;
    this.dataProvider.overlayStatus="Uploading blog image ...";
    let file= this.getFileFromEvent(this.imageEvent);
    console.log(file)
    let blogName = this.form.get('blogName')!.value.replaceAll(" ","");
    let fileName=`blogImages/${blogName}/`+ blogName + file.name;

    this.uploadFile(file,fileName).subscribe((value)=>{

    this.dataProvider.overlayStatus="Setting data fields ...";
      let data = {
        blogImage: value,
        blogTitle: this.form.get('blogName')!.value,
        blogExcerpt: this.form.get('blogExcerpt')!.value,
        blogContent: this.form.get('blogContent')!.value,
        blogTags: this.form.get('blogTags')!.value.toString().split(','),
        blogDate: this.form.get('blogDate')!.value,
        isPublished:this.blogPublish.value,
        mainBlog: this.mainBlog.value,
        lastEdit:[],
      }
      this.dataProvider.overlayStatus="Uploading data to database...";
      console.log(data);
      this.inventoryService.addBlog(data);
      this.isLoading=false;
      this.form.enable()
      this.authService.presentToast('Blog added successfully');
      this.dataProvider.showOverlay=false;
    })
  }
  ngOnInit() {}
}
