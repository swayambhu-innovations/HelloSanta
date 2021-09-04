import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { StarRatingComponent } from 'ng-starrating';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
  constructor(
    private analytics: AngularFireAnalytics,
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private inventoryService: InventoryService,
    private popoverController: PopoverController,
    ) {
    this.form = this.formbuilder.group({
      commentTitle: this.commentTitle,
      commentBody: this.commentBody,
    });
  }
  @Input() productId:string;
  form: FormGroup;
  commentTitle: FormControl = new FormControl('', [Validators.required,Validators.maxLength(50),Validators.minLength(5)]);
  commentBody: FormControl = new FormControl('', [Validators.required,Validators.maxLength(500),Validators.minLength(5)]);
  stars: number = 0;
  ngOnInit() {}
  changeRatingStar($event: {
    oldValue: number;
    newValue: number;
    starRating: StarRatingComponent;
  }) {
    this.stars = $event.newValue;
  }
  addComment(){
    this.analytics.logEvent('addComment');
    let today = new Date();
    let commentData = {
      commentTitle: this.form.get('commentTitle').value,
      commentBody: this.form.get('commentBody').value,
      userId: this.authService.userId,
      userName: this.authService.getUserName(),
      userImage: this.authService.getUserPhoto(),
      commentDate: today.toDateString(),
      stars: this.stars,
    };
    this.inventoryService.addComment(commentData, this.productId);
    this.authService.presentToast('Comment added',5000);
    this.popoverController.dismiss();
  }
}
