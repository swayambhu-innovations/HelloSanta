import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-vp-feedback',
  templateUrl: './vp-feedback.component.html',
  styleUrls: ['./vp-feedback.component.scss'],
})
export class VPFeedbackComponent implements OnInit {
  feedbacks=[]
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.afs.collection('products').ref.get().then(snapshot => {
      snapshot.forEach((doc:any) => {
        if (doc.data().vendorId.includes(this.authService.userId)) {
          this.afs.collection('products').doc(doc.id).collection('comments').ref.get().then(snapshot => {
            snapshot.forEach((doc:any) => {
              this.feedbacks.push(doc.data())
            })
          })
        }
      })
    })
  }

}
