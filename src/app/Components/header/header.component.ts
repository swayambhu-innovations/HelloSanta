import { UserinfoComponent } from './../../popovers/userinfo/userinfo.component';
import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { PopoverController } from '@ionic/angular';
import { CartinfoComponent } from 'src/app/popovers/cartinfo/cartinfo.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  image = ""
  constructor(public authService: AuthService, public dataProvider: DataProvider, public popoverController: PopoverController) { }

  ngOnInit() {
    this.image = this.authService.getUserPhoto()
  }

  async presentUserinfo(ev: any) {
    const popover = await this.popoverController.create({
      component: UserinfoComponent,
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentCartinfo(ev: any) {
    const popover = await this.popoverController.create({
      component: CartinfoComponent,
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
