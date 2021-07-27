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
import { UserCardComponent } from './Components/user-card/user-card.component';
import { ErrorCardComponent } from './Components/error-card/error-card.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AccordionComponent } from './Components/accordion/accordion.component';
import { HomeComponent } from './customerPanel/home/home.component';
import { SetupComponent } from './customerPanel/setup/setup.component';
import { ProfileComponent } from './customerPanel/profile/profile.component';
import { FeedbackComponent } from './customerPanel/feedback/feedback.component';
import { WishlistComponent } from './customerPanel/wishlist/wishlist.component';
import { OrdersComponent } from './customerPanel/orders/orders.component';
import { DigitalartworksComponent } from './customerPanel/digitalartworks/digitalartworks.component';
import { HandmadeartworksComponent } from './customerPanel/handmadeartworks/handmadeartworks.component';
import { TrackorderComponent } from './customerPanel/trackorder/trackorder.component';
import { CartComponent } from './customerPanel/cart/cart.component';
import { HelpComponent } from './customerPanel/help/help.component';
import { CheckoutComponent } from './customerPanel/checkout/checkout.component';
import { DisclaimerComponent } from './customerPanel/disclaimer/disclaimer.component';
import { PrivacypolicyComponent } from './customerPanel/privacypolicy/privacypolicy.component';
import { TermsandconditionsComponent } from './customerPanel/termsandconditions/termsandconditions.component';
import { RefundandreturnComponent } from './customerPanel/refundandreturn/refundandreturn.component';
import { BloghomeComponent } from './customerPanel/bloghome/bloghome.component';
import { BlogComponent } from './customerPanel/blog/blog.component';
import { BuyagainComponent } from './customerPanel/buyagain/buyagain.component';
import { AccountComponent } from './customerPanel/account/account.component';
import { SingleproductComponent } from './customerPanel/singleproduct/singleproduct.component';
import { AngularFireStorageModule } from '@angular/fire/storage'
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AuthLoginComponent } from './customerPanel/auth-login/auth-login.component';
import { AuthSignUpComponent } from './customerPanel/auth-sign-up/auth-sign-up.component';
import { environment } from 'src/environments/environment';
import { VPDashboardComponent } from './vendorPanel/vp-dashboard/vp-dashboard.component';
import { VPProfileComponent } from './vendorPanel/vp-profile/vp-profile.component';
import { VPProductsComponent } from './vendorPanel/vp-products/vp-products.component';
import { VPOrdersComponent } from './vendorPanel/vp-orders/vp-orders.component';
import { VPIssuesComponent } from './vendorPanel/vp-issues/vp-issues.component';
import { VPFeedbackComponent } from './vendorPanel/vp-feedback/vp-feedback.component';
import { FeedbackCardComponent } from './Components/feedback-card/feedback-card.component';
import { IssuesCardComponent } from './Components/issues-card/issues-card.component';
import { RatingModule } from 'ng-starrating';
import { VPOrdersSummaryCardComponent } from './Components/vporders-summary-card/vporders-summary-card.component';
import { VPProductCardComponent } from './Components/vpproduct-card/vpproduct-card.component';
import { AuthService } from './services/auth.service';
import { DataProvider } from './providers/data.provider';
import { LoginGuard } from './guards/login-guard.guard';
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
    VPDashboardComponent,
    VPProfileComponent,
    VPProductsComponent,
    VPOrdersComponent,
    VPIssuesComponent,
    VPFeedbackComponent,
    ProductComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    UserCardComponent,
    ErrorCardComponent,
    SidenavComponent,
    AccordionComponent,
    SetupComponent,
    ProfileComponent,
    FeedbackComponent,
    WishlistComponent,
    OrdersComponent,
    DigitalartworksComponent,
    HandmadeartworksComponent,
    TrackorderComponent,
    CartComponent,
    HelpComponent,
    CheckoutComponent,
    DisclaimerComponent,
    PrivacypolicyComponent,
    TermsandconditionsComponent,
    RefundandreturnComponent,
    BloghomeComponent,
    BlogComponent,
    BuyagainComponent,
    AccountComponent,
    SingleproductComponent,
    AuthLoginComponent,
    AuthSignUpComponent,
    FeedbackCardComponent,
    IssuesCardComponent,
    VPOrdersSummaryCardComponent,
    VPProductCardComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    RatingModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    DataProvider,
    LoginGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
