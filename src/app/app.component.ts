import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AppLayoutModule} from "./layout/app.layout.module";
import {DOCUMENT} from "@angular/common";
import {InputSwitchModule} from "primeng/inputswitch";
import {SharedModule} from "./shared/shared.module";
import {SwitchLightComponent} from "./core/components/switch-light/switch-light.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppLayoutModule, InputSwitchModule, SharedModule, SwitchLightComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RunAlliance-front-angularv18';

  // #document = inject(DOCUMENT);
  // isDarkMode = false;
  // toggleLightDark() {
  //   const linkElement = this.#document.getElementById(
  //     'theme-css',
  //   ) as HTMLLinkElement;
  //   if (linkElement.href.includes('assets/layout/styles/theme/lara-light-indigo/theme.css')) {
  //     linkElement.href = 'assets/layout/styles/theme/lara-dark-indigo/theme.css';
  //     this.isDarkMode = true;
  //   } else {
  //     linkElement.href = 'assets/layout/styles/theme/lara-light-indigo/theme.css';
  //     this.isDarkMode = false;
  //   }
  // }
  // display: boolean = false;

}
