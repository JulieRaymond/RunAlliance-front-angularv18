import {Component} from '@angular/core';
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {PasswordModule} from "primeng/password";
import {SharedModule} from "../../../../shared/shared.module";
import {CheckboxModule} from "primeng/checkbox";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PasswordModule,
    SharedModule,
    CheckboxModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  valCheck: string[] = ['remember'];

  password!: string;

  constructor(public layoutService: LayoutService) {
  }
}
