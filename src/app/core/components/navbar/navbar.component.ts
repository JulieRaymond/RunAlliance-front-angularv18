import {Component} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {Router, RouterLink} from "@angular/router";
import {StyleClassModule} from "primeng/styleclass";
import {LayoutService} from "../../../layout/service/app.layout.service";
import {AuthService} from "../../../shared/services/auth.service";
import {SharedModule} from "../../../shared/shared.module";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SharedModule,
    ButtonDirective,
    Ripple,
    RouterLink,
    StyleClassModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(public layoutService: LayoutService, public router: Router, public authService: AuthService) {
  }

  logout(): void {
    this.authService.logout();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
