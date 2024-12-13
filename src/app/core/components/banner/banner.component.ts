import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Ripple} from "primeng/ripple";
import {NgClass, NgIf} from "@angular/common";
import {LayoutService} from "../../../layout/service/app.layout.service";

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    RouterLink,
    Ripple,
    NgIf,
    NgClass
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

  // Variable pour gérer la visibilité de la bannière
  isBannerVisible: boolean = true;

  // Injection du LayoutService pour accéder au mode colorScheme
  constructor(public layoutService: LayoutService) {
  }

  ngOnInit() {
    // Optionnel : écouter les changements de colorScheme si nécessaire
  }

  // Méthode pour fermer la bannière
  closeBanner() {
    this.isBannerVisible = false;
  }

  // Getter pour récupérer le colorScheme du LayoutService
  get colorScheme() {
    return this.layoutService.config().colorScheme;
  }
}
