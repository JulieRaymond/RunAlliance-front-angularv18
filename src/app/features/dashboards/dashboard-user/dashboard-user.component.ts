import { Component } from '@angular/core';
import {NavbarComponent} from "../../../core/components/navbar/navbar.component";
import {BannerComponent} from "../../../core/components/banner/banner.component";
import {FooterComponent} from "../../../core/components/footer/footer.component";
import {ButtonDirective} from "primeng/button";
import {CarouselModule} from "primeng/carousel";
import {NgOptimizedImage} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {Ripple} from "primeng/ripple";
import {RouterLink} from "@angular/router";
import {DividerModule} from "primeng/divider";

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [
    NavbarComponent,
    BannerComponent,
    FooterComponent,
    ButtonDirective,
    CarouselModule,
    NgOptimizedImage,
    PrimeTemplate,
    Ripple,
    RouterLink,
    DividerModule
  ],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.scss'
})
export class DashboardUserComponent {

}
