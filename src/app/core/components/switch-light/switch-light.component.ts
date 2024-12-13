import {Component, inject} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputSwitchModule} from "primeng/inputswitch";
import {PrimeTemplate} from "primeng/api";
import {DOCUMENT} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {LayoutService} from "../../../layout/service/app.layout.service";

@Component({
  selector: 'app-switch-light',
  standalone: true,
  imports: [
    ButtonDirective,
    DialogModule,
    InputSwitchModule,
    PrimeTemplate,
    SharedModule
  ],
  templateUrl: './switch-light.component.html',
  styleUrl: './switch-light.component.scss'
})
export class SwitchLightComponent {

  constructor(public layoutService: LayoutService) {
  }

  #document = inject(DOCUMENT);
  isDarkMode = false;

  toggleLightDark() {
    const linkElement = this.#document.getElementById(
      'theme-css',
    ) as HTMLLinkElement;
    if (linkElement.href.includes('assets/layout/styles/theme/lara-light-indigo/theme.css')) {
      linkElement.href = 'assets/layout/styles/theme/lara-dark-indigo/theme.css';
      this.isDarkMode = true;
    } else {
      linkElement.href = 'assets/layout/styles/theme/lara-light-indigo/theme.css';
      this.isDarkMode = false;
    }
  }

  display: boolean = false;

  // Getter pour récupérer le colorScheme du LayoutService
  get colorScheme() {
    return this.layoutService.config().colorScheme;
  }

  // Méthode pour basculer entre les thèmes
  toggleTheme(): void {
    this.layoutService.toggleColorScheme();
  }
}
