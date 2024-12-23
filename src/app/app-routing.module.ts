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
import { AuthSignUpComponent } from './customerPanel/auth-sign-up/auth-sign-up.component';
import { AuthLoginComponent } from './customerPanel/auth-login/auth-login.component';
import { HomeComponent } from './customerPanel/home/home.component';
import { ProfileComponent } from './customerPanel/profile/profile.component';
import { FeedbackComponent } from './customerPanel/feedback/feedback.component';
import { WishlistComponent } from './customerPanel/wishlist/wishlist.component';
import { OrdersComponent } from './customerPanel/orders/orders.component';
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
import { CustomproductComponent } from './customerPanel/Customproduct/Customproduct.component';
import { LoginGuard } from './guards/login-guard.guard';
import { VerifyEmailComponent } from './customerPanel/verify-email/verify-email.component';
import {
  AngularFireAuthGuard,
  hasCustomClaim,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { AdminPanelGuard } from './guards/admin-panel.guard';
import { PendingProductsComponent } from './adminPanel/pending-products/pending-products.component';
import { UserReferralComponent } from './customerPanel/user-referral/user-referral.component';
import { CalenderComponent } from './customerPanel/calender/calender.component';
import { CategoryProductsComponent } from './customerPanel/category-products/category-products.component';
import { ShopComponent } from './customerPanel/shop/shop.component';
import { NotFound404Component } from './customerPanel/not-found404/not-found404.component';
import { AboutusComponent } from './customerPanel/aboutus/aboutus.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AuthLoginComponent },
  { path: 'signup', component: AuthSignUpComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard] },
  {
    path: 'feedback',
    component: FeedbackComponent,
    canActivate: [LoginGuard],
    data: {
      authGuardPipe: redirectLoggedInTo(['/Login']),
      route: 'checkout',
      animation: 'isRight',
    },
  },
  { path: 'wishlist', component: WishlistComponent, canActivate: [LoginGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [LoginGuard] },
  {
    path: 'referral',
    component: UserReferralComponent,
    canActivate: [LoginGuard],
  },
  { path: 'calendar', component: CalenderComponent, canActivate: [LoginGuard] },
  {
    path: 'trackorder',
    component: TrackorderComponent,
    canActivate: [LoginGuard],
  },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent, canActivate: [LoginGuard] },
  { path: 'help', component: HelpComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [LoginGuard] },
  { path: 'disclaimer', component: DisclaimerComponent },
  { path: 'privacypolicy', component: PrivacypolicyComponent },
  { path: 'termsandconditions', component: TermsandconditionsComponent },
  { path: 'refund', component: RefundandreturnComponent },
  { path: 'bloghome', component: BloghomeComponent },
  { path: 'post', component: BlogComponent },
  { path: 'buyagain', component: BuyagainComponent, canActivate: [LoginGuard] },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [LoginGuard],
    data: {
      authGuardPipe: redirectLoggedInTo(['/Login']),
      route: 'checkout',
      animation: 'isRight',
    },
  },
  { path: 'product', component: SingleproductComponent },
  {
    path: 'customorder',
    component: CustomproductComponent,
    canActivate: [LoginGuard],
  },
  { path: 'specificProducts', component: CategoryProductsComponent },
  { path: 'verifyEmail', component: VerifyEmailComponent },
  {
    path: 'AdminPanel',
    canActivate: [AdminPanelGuard],

    component: AdminPanelComponent,
    children: [
      { path: 'Dashboard', component: APDashboardComponent },
      { path: 'Order', component: APOrdersComponent },
      { path: 'Vendors', component: APVendorsComponent },
      { path: 'Products', component: APProductsComponent },
      { path: 'Users', component: APUsersComponent },
      { path: 'Customize', component: APCustomizeComponent },
      { path: 'Complains', component: APComplainsComponent },
      { path: 'OffersAndReferrals', component: APOffersReferralsComponent },
      { path: 'Blog', component: APBLogComponent },
      { path: 'Feedback', component: APFeedbackComponent },
      { path: 'Analytics', component: APAnalyticsComponent },
      { path: 'LoginAccess', component: APLoginAccessComponent },
      { path: 'PendingProducts', component: PendingProductsComponent },
    ],
  },
  {
    path: 'VendorPanel',
    canActivate: [LoginGuard],

    component: VendorPanelComponent,
    children: [
      { path: 'Dashboard', component: VPDashboardComponent },
      { path: 'Order', component: VPOrdersComponent },
      { path: 'Products', component: VPProductsComponent },
      { path: 'Issues', component: VPIssuesComponent },
      { path: 'Feedback', component: VPFeedbackComponent },
      { path: 'Profile', component: VPProfileComponent },
    ],
  },
  { path: '**', component: NotFound404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
