import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {Ripple} from "primeng/ripple";

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    RouterLink,
    Ripple
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

}
