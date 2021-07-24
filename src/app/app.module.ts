import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { APVendorsComponent } from './adminPanel/ap-vendors/ap-vendors.component';
import { APProductsComponent } from './adminPanel/ap-products/ap-products.component';
import { APUsersComponent } from './adminPanel/ap-users/ap-users.component';
import { APOrdersComponent } from './adminPanel/ap-orders/ap-orders.component';
import { APOffersReferralsComponent } from './adminPanel/ap-offers-referrals/ap-offers-referrals.component';
import { APLoginAccessComponent } from './adminPanel/ap-login-access/ap-login-access.component';
import { APFeedbackComponent } from './adminPanel/ap-feedback/ap-feedback.component';
import { APDashboardComponent } from './adminPanel/ap-dashboard/ap-dashboard.component';
import { APAnalyticsComponent } from './adminPanel/ap-analytics/ap-analytics.component';
import { APCustomizeComponent } from './adminPanel/ap-customize/ap-customize.component';
import { APComplainsComponent } from './adminPanel/ap-complains/ap-complains.component';
import { APBLogComponent } from './adminPanel/ap-blog/ap-blog.component';
import { VendorPanelComponent } from './vendorPanel/vendor-panel/vendor-panel.component';
import { AdminPanelComponent } from './adminPanel/admin-panel/admin-panel.component';
import { ProductComponent } from './Components/product/product.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { UserCardComponent } from './Components/user-card/user-card.component';
import { ErrorCardComponent } from './Components/error-card/error-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    VendorPanelComponent,
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
    APBLogComponent,
    ProductComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    UserCardComponent,
    ErrorCardComponent,
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
