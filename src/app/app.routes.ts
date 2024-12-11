import {Routes} from '@angular/router';
import {DashboardAdminComponent} from "./features/dashboards/dashboard-admin/dashboard-admin.component";
import {HomepageComponent} from "./features/home/homepage/homepage.component";
import {AppLayoutComponent} from "./layout/app.layout.component";

export const routes: Routes =
  [
    {path: '', component: HomepageComponent},
    {
      path: 'dashboard', component: AppLayoutComponent,
      children: [{path: 'admin', component: DashboardAdminComponent}]
    },
  ];
