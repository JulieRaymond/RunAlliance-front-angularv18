import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {LayoutService} from "../../../layout/service/app.layout.service";

@Component({
  selector: 'app-footer',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public layoutService: LayoutService, public router: Router) {
  }
}
