import {Component} from '@angular/core';
import {NavbarComponent} from "../../../core/components/navbar/navbar.component";
import {FooterComponent} from "../../../core/components/footer/footer.component";
import {CarouselModule} from "primeng/carousel";
import {Router} from "@angular/router";
import {DividerModule} from "primeng/divider";
import {SharedModule} from "../../../shared/shared.module";
import {User} from "../../../shared/models/user.model";
import {AvatarModule} from "primeng/avatar";
import {AuthService} from "../../../shared/services/auth.service";
import {StatisticsService} from "../../../shared/services/statistics.service";
import {Observable} from "rxjs";
import {ChartOptions} from "chart.js";

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CarouselModule,
    DividerModule,
    SharedModule,
    AvatarModule
  ],
  providers: [],
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent {

  user!: User;
  barData$: Observable<any> | undefined;
  lineData$: Observable<any> | undefined;
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: '#4A4A4A',
        },
        grid: {
          color: '#f3f3f3'
        }
      },
      y: {
        ticks: {
          color: '#4A4A4A',
        },
        grid: {
          color: '#f3f3f3'
        }
      }
    }
  };
  challenges: string[] = [];

  constructor(
    private statisticsService: StatisticsService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.authService.getCurrentUser().subscribe({
      next: (user: User) => {
        this.user = user;
        this.loadStatistics();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
        this.router.navigate(['/login']);
      }
    });
  }

  private loadStatistics(): void {
    if (this.user && this.user.id) {
      this.barData$ = this.statisticsService.getWeeklyStatistics(this.user.id);
      this.lineData$ = this.statisticsService.getMonthlyStatistics(this.user.id);
    }
  }

  // Méthode pour générer les challenges
  generateChallenges() {
    if (this.barData$) {
      this.barData$.subscribe(weeklyData => {
        const totalKm = weeklyData.datasets[0].data.reduce((sum: number) => sum + 1, 0);
        const bestDistance = Math.max(...weeklyData.datasets[0].data);

        this.challenges = [
          `Améliore ton 5km`,
          `Cours plus de ${totalKm + 5} km ce mois-ci.`,
          `Bats ton record de ${bestDistance} km !`
        ];
      });
    }
  }
}
