import {Component} from '@angular/core';
import {CarouselModule, CarouselResponsiveOptions} from "primeng/carousel";
import {LayoutService} from "../../../layout/service/app.layout.service";
import {Router, RouterLink} from "@angular/router";
import {StyleClassModule} from "primeng/styleclass";
import {Ripple} from "primeng/ripple";
import {ButtonDirective} from "primeng/button";
import {BannerComponent} from "../../../core/components/banner/banner.component";
import {NavbarComponent} from "../../../core/components/navbar/navbar.component";
import {FooterComponent} from "../../../core/components/footer/footer.component";
import {NgOptimizedImage} from "@angular/common";

interface Product {
  isExternal: boolean;
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    StyleClassModule,
    RouterLink,
    Ripple,
    CarouselModule,
    ButtonDirective,
    BannerComponent,
    NavbarComponent,
    FooterComponent,
    NgOptimizedImage
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  products: Product[] = [];
  carouselResponsiveOptions: CarouselResponsiveOptions[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(public layoutService: LayoutService, public router: Router) {
    this.initializeProducts();
  }

  navigateToProduct(product: Product) {
    if (product.isExternal) {
      // Ouvrir un lien externe dans un nouvel onglet
      window.open(product.route, '_blank');
    } else {
      // Naviguer vers un lien interne avec Angular Router
      this.router.navigate([product.route]);
    }
  }

  private initializeProducts(): void {
    this.products = [
      {
        id: '1',
        name: 'Calendrier des courses',
        description: 'Consultez et gérez votre calendrier de courses.',
        icon: 'pi pi-calendar',
        route: '/runs',
        isExternal: false  // Indique que c'est un lien interne
      },
      {
        id: '2',
        name: 'Statistiques personnelles',
        description: 'Analysez vos performances et suivez vos progrès.',
        icon: 'pi pi-chart-line',
        route: '/me',
        isExternal: false  // Lien interne
      },
      {
        id: '3',
        name: 'Planification d’entraînements',
        description: 'Des bilans fonctionnels pour détailler votre bio-mécanique.',
        icon: 'pi pi-pencil',
        route: 'https://www.instagram.com/lab_medical_stadium/',
        isExternal: true  // Lien externe
      },
      {
        id: '4',
        name: 'Communauté',
        description: 'Apprenez en plus sur l\'association.',
        icon: 'pi pi-users',
        route: '/about',
        isExternal: false  // Lien interne
      },
      {
        id: '5',
        name: 'Boutique partenaire',
        description: 'Achetez des équipements pour vos courses.',
        icon: 'pi pi-shopping-cart',
        route: 'https://www.instagram.com/running_bordeaux/?hl=fr',
        isExternal: true  // Lien externe
      },
      {
        id: '6',
        name: 'Support',
        description: 'Posez nous vos questions.',
        icon: 'pi pi-info-circle',
        route: '/contact',
        isExternal: false  // Lien interne
      }
    ];
  }
}
