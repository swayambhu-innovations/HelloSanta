import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { APVendorsComponent } from './ap-vendors/ap-vendors.component';
import { APProductsComponent } from './ap-products/ap-products.component';
import { APUsersComponent } from './ap-users/ap-users.component';
import { APOrdersComponent } from './ap-orders/ap-orders.component';
import { APOffersReferralsComponent } from './ap-offers-referrals/ap-offers-referrals.component';
import { APLoginAccessComponent } from './ap-login-access/ap-login-access.component';
import { APFeedbackComponent } from './ap-feedback/ap-feedback.component';
import { APDashboardComponent } from './ap-dashboard/ap-dashboard.component';
import { APAnalyticsComponent } from './ap-analytics/ap-analytics.component';
import { APCustomizeComponent } from './ap-customize/ap-customize.component';
import { APComplainsComponent } from './ap-complains/ap-complains.component';
import { APBLogComponent } from './ap-blog/ap-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    APDashboardComponent,
    APVendorsComponent,
    APProductsComponent,
    APUsersComponent,
    APOrdersComponent,
    APOffersReferralsComponent,
    APLoginAccessComponent,
    APFeedbackComponent,
    APDashboardComponent,
    APAnalyticsComponent,
    APCustomizeComponent,
    APComplainsComponent,
    APBLogComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
