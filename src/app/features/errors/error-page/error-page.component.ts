import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {Ripple} from "primeng/ripple";
import {ButtonDirective} from "primeng/button";

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [
    RouterLink,
    Ripple,
    ButtonDirective
  ],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {

}
