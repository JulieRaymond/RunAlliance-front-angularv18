import {Component} from '@angular/core';
import {NavbarComponent} from "../../../core/components/navbar/navbar.component";
import {BannerComponent} from "../../../core/components/banner/banner.component";
import {FooterComponent} from "../../../core/components/footer/footer.component";
import {ButtonDirective} from "primeng/button";
import {CarouselModule} from "primeng/carousel";
import {NgOptimizedImage} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {Ripple} from "primeng/ripple";
import {Router, RouterLink} from "@angular/router";
import {DividerModule} from "primeng/divider";
import {SharedModule} from "../../../shared/shared.module";
import {User} from "../../../shared/models/user.model";
import {Run} from "../../../shared/models/run.model";
import {AvatarModule} from "primeng/avatar";
import {AuthService} from "../../../shared/services/auth.service";

class ProfileService {
  // Fausse donnée des courses
  getRuns(): Run[] {
    return [
      {
        runId: 1,
        title: 'Morning Run',
        description: 'Run in the park',
        date: new Date('2024-12-10'),
        time: new Date(),
        location: 'Central Park',
        difficultyLevel: 'DEBUTANT',
        distanceKm: 5,
        durationMinutes: 30,
        inscriptions: []
      },
      {
        runId: 2,
        title: 'Evening Run',
        description: 'Run on the track',
        date: new Date('2024-12-12'),
        time: new Date(),
        location: 'Olympic Stadium',
        difficultyLevel: 'INTERMEDIAIRE',
        distanceKm: 10,
        durationMinutes: 60,
        inscriptions: []
      }
    ];
  }
}

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
    DividerModule,
    SharedModule,
    AvatarModule
  ],
  providers: [ProfileService],
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent {

  user!: User;
  runs: Run[] = [];
  barData: any;
  lineData: any;
  chartOptions: any;
  challenges: string[] = [];

  constructor(private profileService: ProfileService, private AuthService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.loadUser();
    this.runs = this.profileService.getRuns();

    this.initCharts();
    this.generateChallenges();
  }

  initCharts() {
    this.barData = {
      labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
      datasets: [
        {
          label: 'Distance (km)',
          data: [5, 8, 6, 10, 7, 15, 12],
          backgroundColor: '#42A5F5'
        }
      ]
    };

    this.lineData = {
      labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
      datasets: [
        {
          label: 'Allure moyenne (km/h)',
          data: [9, 10, 8, 11],
          borderColor: '#66BB6A',
          fill: false
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };
  }

  generateChallenges() {
    const totalKm = this.runs.reduce((sum, run) => sum + run.distanceKm, 0);
    const bestDistance = Math.max(...this.runs.map(run => run.distanceKm));

    this.challenges = [
      `Améliore ton 5km`,
      `Cours plus de ${totalKm + 5} km ce mois-ci.`,
      `Bats ton record de ${bestDistance} km !`
    ];
  }

  private loadUser(): void {
    // Vérifier si un token existe avant de récupérer l'utilisateur
    const token = localStorage.getItem('authToken');  // Supposons que le token soit dans localStorage
    if (!token) {
      this.router.navigate(['/login']);  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      return;
    }

    // Si le token existe, récupérer l'utilisateur
    this.AuthService.getCurrentUser().subscribe({
      next: (user: User) => {
        if (user) {
          this.user = user;  // Assigner l'utilisateur uniquement si il est défini
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
        this.router.navigate(['/login']);  // Rediriger vers la page de login en cas d'erreur
      }
    });
  }

}
