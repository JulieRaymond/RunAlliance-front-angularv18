import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {NgOptimizedImage} from "@angular/common";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    ButtonDirective,
    Ripple
  ],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent {

  constructor(public layoutService: LayoutService) {
  }
}
