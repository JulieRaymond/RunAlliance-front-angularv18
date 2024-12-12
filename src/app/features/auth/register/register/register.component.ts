import {Component} from '@angular/core';
import {SharedModule} from "../../../../shared/shared.module";
import {PasswordModule} from "primeng/password";
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        SharedModule,
        PasswordModule,
        RouterLink
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  userPassword: any;
  userConfirmPassword: any;

  constructor(public layoutService: LayoutService) {
  }
}
