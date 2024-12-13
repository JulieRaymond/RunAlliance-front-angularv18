import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {LayoutService} from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(public layoutService: LayoutService) {
  }

  ngOnInit() {
    this.model = [
      {
        label: 'Accueil',
        items: [
          {label: 'Retour au site', icon: 'pi pi-fw pi-external-link\n', routerLink: ['/']},
          {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard/admin']},
        ]
      },
      {
        label: 'Les courses',
        items: [
          {label: 'Manager les courses', icon: 'pi pi-fw pi-id-card', routerLink: ['/dashboard/admin/crud-run-admin']},
        ]
      },
      {
        label: 'Les utilisateurs',
        items: [
          {label: 'Manager les utilisateurs', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW'},
        ]
      },
      {
        label: 'Messagerie',
        items: [
          {label: 'Messages reçus', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons']},
          {label: 'Envoyer un message', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons']},
          // {
          //   label: 'PrimeFlex',
          //   icon: 'pi pi-fw pi-desktop',
          //   url: ['https://www.primefaces.org/primeflex/'],
          //   target: '_blank'
          // },
        ]
      },
      {
        label: 'Pages du site',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Se connecter',
            icon: 'pi pi-fw pi-globe',
            routerLink: ['/landing']
          },
          {
            label: 'S\'inscrire',
            icon: 'pi pi-fw pi-user',
          },
          {
            label: 'Login',
            icon: 'pi pi-fw pi-sign-in',
            routerLink: ['/auth/login']
          },
          {
            label: 'Page d\'erreur',
            icon: 'pi pi-fw pi-times-circle',
            routerLink: ['/auth/error']
          },
          {
            label: 'Accès refusé',
            icon: 'pi pi-fw pi-lock',
            routerLink: ['/auth/access']
          },
          {
            label: 'Crud',
            icon: 'pi pi-fw pi-pencil',
            routerLink: ['/pages/crud']
          },
          {
            label: 'Listes des courses publiques',
            icon: 'pi pi-fw pi-calendar',
            routerLink: ['/pages/timeline']
          },
          {
            label: 'Page non trouvée',
            icon: 'pi pi-fw pi-exclamation-circle',
            routerLink: ['/notfound']
          },
        ]
      },
      // {
      //   label: 'Hierarchy',
      //   items: [
      //     {
      //       label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
      //       items: [
      //         {
      //           label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
      //           items: [
      //             {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark'},
      //             {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark'},
      //             {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark'},
      //           ]
      //         },
      //         {
      //           label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
      //           items: [
      //             {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark'}
      //           ]
      //         },
      //       ]
      //     },
      //     {
      //       label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
      //       items: [
      //         {
      //           label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
      //           items: [
      //             {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark'},
      //             {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark'},
      //           ]
      //         },
      //         {
      //           label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
      //           items: [
      //             {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark'},
      //           ]
      //         },
      //       ]
      //     }
      //   ]
      // },
      // {
      //   label: 'Get Started',
      //   items: [
      //     {
      //       label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
      //     },
      //     {
      //       label: 'View Source',
      //       icon: 'pi pi-fw pi-search',
      //       url: ['https://github.com/primefaces/sakai-ng'],
      //       target: '_blank'
      //     }
      //   ]
      // }
    ];
  }
}
