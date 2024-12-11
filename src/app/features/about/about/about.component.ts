import { Component } from '@angular/core';
import {NavbarComponent} from "../../../core/components/navbar/navbar.component";
import {SplitterModule} from "primeng/splitter";
import {AccordionModule} from "primeng/accordion";
import {FooterComponent} from "../../../core/components/footer/footer.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NavbarComponent,
    SplitterModule,
    AccordionModule,
    FooterComponent,
    NgOptimizedImage
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
