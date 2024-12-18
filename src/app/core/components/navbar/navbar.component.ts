import {Component} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {Router, RouterLink} from "@angular/router";
import {StyleClassModule} from "primeng/styleclass";
import {LayoutService} from "../../../layout/service/app.layout.service";
import {AuthService} from "../../../shared/services/auth.service";
import {SharedModule} from "../../../shared/shared.module";
import {ConfirmationService, MessageService} from "primeng/api";

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

  constructor(public layoutService: LayoutService, public router: Router, public authService: AuthService, private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  showLogoutConfirmation(): void {
    this.confirmationService.confirm({
      key: 'logoutConfirm',
      message: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      accept: () => this.confirmLogout(),
      reject: () => this.cancelLogout()
    });
  }

  confirmLogout(): void {
    this.authService.logout();
    this.messageService.add({
      severity: 'success',
      summary: 'Déconnexion réussie',
      detail: 'Vous êtes bien déconnecté(e). À plus tard pour une prochaine course !',
      life: 5000
    });
    this.router.navigate(['/login']);
  }

  cancelLogout(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Action annulée',
      detail: 'Vous êtes toujours connecté(e). Bonne continuation !',
      life: 5000
    });
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
