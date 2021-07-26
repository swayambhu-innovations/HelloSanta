import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './adminPanel/admin-panel/admin-panel.component';
import { APAnalyticsComponent } from './adminPanel/ap-analytics/ap-analytics.component';
import { APBLogComponent } from './adminPanel/ap-blog/ap-blog.component';
import { APComplainsComponent } from './adminPanel/ap-complains/ap-complains.component';
import { APCustomizeComponent } from './adminPanel/ap-customize/ap-customize.component';
import { APDashboardComponent } from './adminPanel/ap-dashboard/ap-dashboard.component';
import { APFeedbackComponent } from './adminPanel/ap-feedback/ap-feedback.component';
import { APLoginAccessComponent } from './adminPanel/ap-login-access/ap-login-access.component';
import { APOffersReferralsComponent } from './adminPanel/ap-offers-referrals/ap-offers-referrals.component';
import { APOrdersComponent } from './adminPanel/ap-orders/ap-orders.component';
import { APProductsComponent } from './adminPanel/ap-products/ap-products.component';
import { APUsersComponent } from './adminPanel/ap-users/ap-users.component';
import { APVendorsComponent } from './adminPanel/ap-vendors/ap-vendors.component';
import { VendorPanelComponent } from './vendorPanel/vendor-panel/vendor-panel.component';
import { VPDashboardComponent } from './vendorPanel/vp-dashboard/vp-dashboard.component';
import { VPFeedbackComponent } from './vendorPanel/vp-feedback/vp-feedback.component';
import { VPIssuesComponent } from './vendorPanel/vp-issues/vp-issues.component';
import { VPOrdersComponent } from './vendorPanel/vp-orders/vp-orders.component';
import { VPProductsComponent } from './vendorPanel/vp-products/vp-products.component';
import { VPProfileComponent } from './vendorPanel/vp-profile/vp-profile.component';
import { VPReviewsComponent } from './vendorPanel/vp-reviews/vp-reviews.component';
import {AuthSignUpComponent} from "./customerPanel/auth-sign-up/auth-sign-up.component";
import {AuthLoginComponent} from "./customerPanel/auth-login/auth-login.component";
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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full'
  },
  {path:'Home', component:HomeComponent},
  {path:'login', component:AuthLoginComponent},
  {path:'signin', component:AuthSignUpComponent},
  {path:'setup', component:SetupComponent},
  {path:'profile', component:ProfileComponent},
  {path:'feedback', component: FeedbackComponent},
  {path:'wishlist', component:WishlistComponent},
  {path:'orders', component:OrdersComponent},
  {path:'digitalart', component:DigitalartworksComponent},
  {path:'handmadeart', component:HandmadeartworksComponent},
  {path:'trackorder', component:TrackorderComponent},
  {path:'cart', component:CartComponent},
  {path:'help', component:HelpComponent},
  {path:'checkout', component:CheckoutComponent},
  {path:'disclaimer', component:DisclaimerComponent},
  {path:'privacypolicy', component:PrivacypolicyComponent},
  {path:'termsandconditions', component:TermsandconditionsComponent},
  {path:'refund', component:RefundandreturnComponent},
  {path:'bloghome', component:BloghomeComponent},
  {path:'blog', component:BlogComponent},
  {path:'buyagain', component:BuyagainComponent},
  {path:'account', component:AccountComponent},
  {path:'product', component:SingleproductComponent},

  {
    path:"AdminPanel",
    component:AdminPanelComponent,
    children:[
      {path:'Dashboard',component:APDashboardComponent},
      {path:'Order',component:APOrdersComponent},
      {path:'Vendors',component:APVendorsComponent},
      {path:'Products',component:APProductsComponent},
      {path:'Users',component:APUsersComponent},
      {path:'Customize',component:APCustomizeComponent},
      {path:'Complains',component:APComplainsComponent},
      {path:'OffersAndReferrals',component:APOffersReferralsComponent},
      {path:'Blog',component:APBLogComponent},
      {path:'Feedback',component:APFeedbackComponent},
      {path:'Analytics',component:APAnalyticsComponent},
      {path:'LoginAccess',component:APLoginAccessComponent},
    ]
  },
  {
    path:"VendorPanel",
    component:VendorPanelComponent,
    children:[
      {path:'Dashboard',component:VPDashboardComponent},
      {path:'Order',component:VPOrdersComponent},
      {path:'Products',component:VPProductsComponent},
      {path:'Issues',component:VPIssuesComponent},
      {path:'Reviews',component:VPReviewsComponent},
      {path:'Feedback',component:VPFeedbackComponent},
      {path:'Profile',component:VPProfileComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
