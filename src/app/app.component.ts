import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AppLayoutModule} from "./layout/app.layout.module";
import {InputSwitchModule} from "primeng/inputswitch";
import {SharedModule} from "./shared/shared.module";
import {SwitchLightComponent} from "./core/components/switch-light/switch-light.component";
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AppLayoutModule,
    InputSwitchModule,
    SharedModule,
    SwitchLightComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RunAlliance-front-angularv18';

  constructor(private authService: AuthService) {
  }

  logout(): void {
    this.authService.logout();
  }
}
