import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { APAnalyticsComponent } from './ap-analytics/ap-analytics.component';
import { APBLogComponent } from './ap-blog/ap-blog.component';
import { APComplainsComponent } from './ap-complains/ap-complains.component';
import { APCustomizeComponent } from './ap-customize/ap-customize.component';
import { APDashboardComponent } from './ap-dashboard/ap-dashboard.component';
import { APFeedbackComponent } from './ap-feedback/ap-feedback.component';
import { APLoginAccessComponent } from './ap-login-access/ap-login-access.component';
import { APOffersReferralsComponent } from './ap-offers-referrals/ap-offers-referrals.component';
import { APOrdersComponent } from './ap-orders/ap-orders.component';
import { APProductsComponent } from './ap-products/ap-products.component';
import { APUsersComponent } from './ap-users/ap-users.component';
import { APVendorsComponent } from './ap-vendors/ap-vendors.component';
import { VendorPanelComponent } from './vendor-panel/vendor-panel.component';
import { VPDashboardComponent } from './vp-dashboard/vp-dashboard.component';
import { VPFeedbackComponent } from './vp-feedback/vp-feedback.component';
import { VPIssuesComponent } from './vp-issues/vp-issues.component';
import { VPOrdersComponent } from './vp-orders/vp-orders.component';
import { VPProductsComponent } from './vp-products/vp-products.component';
import { VPProfileComponent } from './vp-profile/vp-profile.component';
import { VPReviewsComponent } from './vp-reviews/vp-reviews.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'AdminPanel/Dashboard',
    pathMatch: 'full'
  },
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
