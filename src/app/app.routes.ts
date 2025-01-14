import {Routes} from '@angular/router';
import {DashboardAdminComponent} from "./features/dashboards/dashboard-admin/dashboard-admin.component";
import {HomepageComponent} from "./features/home/homepage/homepage.component";
import {AppLayoutComponent} from "./layout/app.layout.component";
import {LoginComponent} from "./features/auth/login/login/login.component";
import {RegisterComponent} from "./features/auth/register/register/register.component";
import {ContactFormComponent} from "./features/contact/contact-form/contact-form.component";
import {AboutComponent} from "./features/about/about/about.component";
import {RunPublicListComponent} from "./features/runPublicList/run-public-list/run-public-list.component";
import {NotFoundComponent} from "./features/NotFound/not-found/not-found.component";
import {ErrorPageComponent} from "./features/errors/error-page/error-page.component";
import {CrudRunAdminComponent} from "./core/components/crud-run-admin/crud-run-admin.component";
import {WelcomeDashboardComponent} from "./core/components/welcome-dashboard/welcome-dashboard.component";
import {CrudUserAdminComponent} from "./core/components/crud-user-admin/crud-user-admin.component";
import {UnauthorizedComponent} from "./features/auth/access/unauthorized/unauthorized.component";
import {DashboardUserComponent} from "./features/dashboards/dashboard-user/dashboard-user.component";
import {adminGuard} from "./shared/guards/admin.guard";
import {ForgotPasswordComponent} from "./core/components/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./core/components/reset-password/reset-password.component";
import {
  CrudRegistrationAdminComponent
} from "./core/components/crud-registration-admin/crud-registration-admin.component";

export const routes: Routes =
  [
    {path: '', component: HomepageComponent},
    {
      path: 'dashboard',
      component: AppLayoutComponent,
      canActivateChild: [adminGuard],
      children: [
        {
          path: 'admin',
          component: DashboardAdminComponent,
          children: [
            {path: '', component: WelcomeDashboardComponent},
            {path: 'crud-run-admin', component: CrudRunAdminComponent},
            {path: 'crud-user-admin', component: CrudUserAdminComponent},
            {path: 'crud-registration-admin', component: CrudRegistrationAdminComponent},
          ]
        },
      ]
    },
    {path: 'me', component: DashboardUserComponent},
    {path: 'login', component: LoginComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'reset-password', component: ResetPasswordComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'contact', component: ContactFormComponent},
    {path: 'about', component: AboutComponent},
    {path: 'runs', component: RunPublicListComponent},
    {path: 'error', component: ErrorPageComponent},
    {path: 'access-denied', component: UnauthorizedComponent},

    {path: '**', component: NotFoundComponent}
  ];
