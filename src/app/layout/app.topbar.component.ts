import {Component, ElementRef, ViewChild} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {LayoutService} from "./service/app.layout.service";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {

  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;


  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {
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
}
