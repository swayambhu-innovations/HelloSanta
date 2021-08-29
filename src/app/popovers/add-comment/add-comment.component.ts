import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    ) {
    this.form = this.formbuilder.group({
      commentTitle: this.commentTitle,
      commentBody: this.commentBody,
    });
  }
  @Input() productId:string;
  form: FormGroup;
  commentTitle: FormControl = new FormControl('', [Validators.required]);
  commentBody: FormControl = new FormControl('', [Validators.required]);
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
    console.log(commentData);
    this.inventoryService.addComment(commentData, this.productId);
  }
}
