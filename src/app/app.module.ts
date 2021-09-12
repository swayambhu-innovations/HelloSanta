import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouteReuseStrategy, RouterStateSnapshot } from '@angular/router';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';

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
import { ProductFullCardComponent } from './components/product-full-card/product-full-card.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { WideProductCardComponent } from './components/wide-product-card/wide-product-card.component';
import { SmallProductCardComponent } from './components/small-product-card/small-product-card.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { AccordionComponent } from './Components/accordion/accordion.component';
import { HomeComponent } from './customerPanel/home/home.component';
import { SetupComponent } from './customerPanel/setup/setup.component';
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
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './customerPanel/verify-email/verify-email.component';
import { SetupModalStepOneComponent } from './modals/setup-modal-step-one/setup-modal-step-one.component';
import { AddProductModalComponent } from './modals/add-product-modal/add-product-modal.component';
import { SearchComponent } from './modals/search/search.component';
import { SortModalComponent } from './modals/sort-modal/sort-modal.component';
import { CartinfoComponent } from './popovers/cartinfo/cartinfo.component';
import { UserinfoComponent } from './popovers/userinfo/userinfo.component';
import { FilterModalComponent } from './modals/filter-modal/filter-modal.component';
import { AddBlogComponent } from './modals/add-blog/add-blog.component';
import { EditProductComponent } from './modals/edit-product/edit-product.component';
import { SpecificProductsComponent } from './popovers/specific-products/specific-products.component';
import { EditBlogComponent } from './modals/edit-blog/edit-blog.component';
import { AddCategoriesComponent } from './modals/add-categories/add-categories.component';
import { PendingProductsComponent } from './adminPanel/pending-products/pending-products.component';
import { PendingProductModalComponent } from './modals/pending-product-modal/pending-product-modal.component';
import { PendingProductEditModalComponent } from './modals/pending-product-edit-modal/pending-product-edit-modal.component';
import { ExtraPendingProductInfoComponent } from './popovers/extra-pending-product-info/extra-pending-product-info.component';
import { ExtraProductInfoComponent } from './modals/extra-product-info/extra-product-info.component';
import { UserPromotionComponent } from './popovers/user-promotion/user-promotion.component';
import { AddOfferComponent } from './modals/add-offer/add-offer.component';
import { AddReferralComponent } from './modals/add-referral/add-referral.component';
import { UserReferralComponent } from './customerPanel/user-referral/user-referral.component';
import { SearchResultComponent } from './popovers/search-result/search-result.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalenderComponent } from './customerPanel/calender/calender.component';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatIconModule } from '@angular/material/icon';
import { ApDashboardOrderItemComponent } from './Components/ap-dashboard-order-item/ap-dashboard-order-item.component';
import { ShippingDetailPopComponent } from './popovers/shipping-detail-pop/shipping-detail-pop.component';
import { ApOrdersOptionsItemComponent } from './Components/ap-orders-options-item/ap-orders-options-item.component';
import { CommentCardComponent } from './Components/comment-card/comment-card.component';
import { MatBadgeModule } from '@angular/material/badge';
import { AddCommentComponent } from './popovers/add-comment/add-comment.component';
import { CategoryProductsComponent } from './customerPanel/category-products/category-products.component';
import { InvoiceDetailComponent } from './modals/invoice-detail/invoice-detail.component';
import { MoreInfoComponent } from './popovers/more-info/more-info.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgCalendarModule } from 'ionic2-calendar';
import { AlertsModalService } from './services/alerts-modal.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { ShowOrderInfoComponent } from './modals/show-order-info/show-order-info.component';
import { OrdercardComponent } from './Components/ordercard/ordercard.component';
import { USE_EMULATOR as FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { AddSocialAccountComponent } from './popovers/add-social-account/add-social-account.component';
import { CustomErrorHandlerService } from './services/logger.service';
import { ShopComponent } from './customerPanel/shop/shop.component';
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
    ProductFullCardComponent,
    CategoryCardComponent,
    WideProductCardComponent,
    SmallProductCardComponent,
    BlogCardComponent,
    AccordionComponent,
    SetupComponent,
    ProfileComponent,
    FeedbackComponent,
    WishlistComponent,
    OrdersComponent,
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
    VerifyEmailComponent,
    SetupModalStepOneComponent,
    AddProductModalComponent,
    SearchComponent,
    SortModalComponent,
    UserinfoComponent,
    CartinfoComponent,
    FilterModalComponent,
    AddBlogComponent,
    EditProductComponent,
    SpecificProductsComponent,
    EditBlogComponent,
    AddCategoriesComponent,
    PendingProductsComponent,
    PendingProductModalComponent,
    PendingProductEditModalComponent,
    ExtraPendingProductInfoComponent,
    ExtraProductInfoComponent,
    UserPromotionComponent,
    AddOfferComponent,
    AddReferralComponent,
    UserReferralComponent,
    SearchResultComponent,
    CalenderComponent,
    CommentCardComponent,
    ApDashboardOrderItemComponent,
    ShippingDetailPopComponent,
    ApOrdersOptionsItemComponent,
    AddCommentComponent,
    CategoryProductsComponent,
    InvoiceDetailComponent,
    MoreInfoComponent,
    CustomproductComponent,
    ShowOrderInfoComponent,
    OrdercardComponent,
    AddSocialAccountComponent,
    ShopComponent,
  ],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    RatingModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    FormsModule,
    MatStepperModule,
    MatExpansionModule,
    MatIconModule,
    MatBadgeModule,
    AngularFireAnalyticsModule,
    NgxImageZoomModule,
    NgCalendarModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    AlertsModalService, 
    DataProvider,
    LoginGuard,
    // {
    //   provide: FIRESTORE_EMULATOR,
    //   useValue: environment.production ? undefined : ['localhost', 8080],
    // },

    {provide: ErrorHandler, useClass: CustomErrorHandlerService},
    {
      provide: 'externalUrlRedirectResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        window.location.href = (route.data as any).externalUrl;
      },
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false, showError: true },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
