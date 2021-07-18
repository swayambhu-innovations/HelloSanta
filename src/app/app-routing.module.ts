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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
