import {Component} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {Router, RouterLink} from "@angular/router";
import {StyleClassModule} from "primeng/styleclass";
import {LayoutService} from "../../../layout/service/app.layout.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ButtonDirective,
    Ripple,
    RouterLink,
    StyleClassModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(public layoutService: LayoutService, public router: Router) {
  }

}
