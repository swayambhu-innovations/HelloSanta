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
  ) {
    this.form = this.formbuilder.group({
      blogName:this.blogName,
      blogContent: this.blogContent,
      blogImage: this.blogImage,
      blogId: this.blogId,
      blogExcerpt: this.blogExcerpt,
      blogTags: this.blogTags,
      blogDate: this.blogDate,
      blogPublish:this.blogPublish,
    });
  }
  isLoading: boolean = false;
  imageEvent:any=undefined;
  form: FormGroup;
  blogName: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  blogId: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('[a-zA-Z0-9]*'),
  ]);
  blogExcerpt: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(300),
  ]);
  blogTags: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  blogDate: FormControl = new FormControl('', [Validators.required]);
  blogContent: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(300),
  ]);
  blogImage: FormControl = new FormControl('', [
    Validators.required,
  ]);
  blogPublish: FormControl = new FormControl('')
  uploadFile(file, fileName) {
    console.log('Starting file upload', fileName);
    const fileRef = this.storage.ref(fileName);
    const task = this.storage.upload(fileName, file);
    return task.snapshotChanges().pipe(
      last(),
      switchMap(() => fileRef.getDownloadURL())
    );
  }
  getFileFromEvent(event){
    let fileList: FileList = event.target.files;
    return fileList[0]
  }
  loadFile(event, count) {
    var image = document.getElementById(count) as HTMLImageElement;
    image.src = URL.createObjectURL(event.target.files[0]);
    if (event.target.files[0].size > 1000000) {
      this.authService.presentToast('File is greater than 500 KB');
      event.target.value = '';
    } else {
      image.src = URL.createObjectURL(event.target.files[0]);
      this.imageEvent = event;
    }
  }
  addBlog() {
    this.isLoading=true;
    let file= this.getFileFromEvent(this.imageEvent);
    let blogName = this.form.get('blogname')!.value.replaceAll(" ","");
    let fileName=`blogImages/${blogName}/`+ blogName + file.name;
    this.uploadFile(this.imageEvent,fileName).subscribe((value)=>{
      let data = {
        blogImage: value,
        blogTitle: this.blogName,
        blogExcerpt: this.blogExcerpt,
        blogContent: this.blogContent,
        blogTags: this.blogTags,
        blogDate: this.blogDate,
        blogId: this.blogId,
        isPublished:this.blogPublish,
        lastEdit:[],
      }
      this.inventoryService.addBlog(data);
      this.isLoading=false;
    })
  }
  ngOnInit() {}
  
}
