import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Ripple} from "primeng/ripple";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    RouterLink,
    Ripple,
    NgIf
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

  // Variable pour gérer la visibilité de la bannière
  isBannerVisible: boolean = true;

  // Méthode pour fermer la bannière
  closeBanner() {
    this.isBannerVisible = false;
  }
}
