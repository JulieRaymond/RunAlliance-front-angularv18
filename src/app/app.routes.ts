import {Routes} from '@angular/router';
import {DashboardAdminComponent} from "./features/dashboards/dashboard-admin/dashboard-admin.component";
import {HomepageComponent} from "./features/home/homepage/homepage.component";
import {AppLayoutComponent} from "./layout/app.layout.component";
import {LoginComponent} from "./features/auth/login/login/login.component";
import {RegisterComponent} from "./features/auth/register/register/register.component";
import {ContactFormComponent} from "./features/contact/contact-form/contact-form.component";
import {AboutComponent} from "./features/about/about/about.component";
import {RunPublicListComponent} from "./features/runPublicList/run-public-list/run-public-list.component";

export const routes: Routes =
  [
    {path: '', component: HomepageComponent},
    {
      path: 'dashboard', component: AppLayoutComponent,
      children: [{path: 'admin', component: DashboardAdminComponent}]
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'contact', component: ContactFormComponent},
    {path: 'about', component: AboutComponent},
    {path: 'runs', component: RunPublicListComponent}
  ];
