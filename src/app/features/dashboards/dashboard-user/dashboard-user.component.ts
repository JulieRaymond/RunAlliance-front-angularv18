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
  challenges: { title: string, accomplishment: string }[] = [];
  previousWeekData: any;  // Variable pour stocker les données de la semaine précédente
  currentMonth: string;

  constructor(
    private statisticsService: StatisticsService,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentMonth = this.getCurrentMonth();
  }

  // Méthode pour obtenir le mois en cours en français
  private getCurrentMonth(): string {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    const currentMonthIndex = new Date().getMonth(); // Renvoie un indice entre 0 et 11
    return months[currentMonthIndex];
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
        this.loadPreviousWeekStatistics();
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
    this.generateChallenges();
  }

  // Méthode pour charger les statistiques de la semaine précédente
  private loadPreviousWeekStatistics(): void {
    if (this.user && this.user.id) {
      this.statisticsService.getPreviousWeekStatistics(this.user.id).subscribe({
        next: (data) => {
          this.previousWeekData = data;  // Stocker les données de la semaine précédente
          this.generateChallenges();  // Recalculer les défis avec les données précédentes
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des statistiques de la semaine précédente:', error);
        }
      });
    }
  }

  generateChallenges() {
    if (this.barData$) {
      this.barData$.subscribe(weeklyData => {
        // Calcul de la distance totale de la semaine
        const totalKm = weeklyData.datasets[0].data.reduce((sum: number) => sum + 1, 0); // Remplacer `1` par une logique réelle
        const bestDistance = Math.max(...weeklyData.datasets[0].data); // Meilleure distance de la semaine

        // Calcul de l'allure moyenne
        const averagePace = weeklyData.datasets[0].data.reduce((sum: number) => sum + 1, 0) / weeklyData.datasets[0].data.length; // Remplacer `1` par une logique réelle

        // Calcul du nombre de jours courus cette semaine
        const daysRan = weeklyData.datasets[0].data.filter((km: number) => km > 0).length;

        // Défis personnalisés en fonction des données de la semaine
        this.challenges = [];

        // Challenge basé sur la distance totale parcourue
        if (totalKm < 10) {
          this.challenges.push({
            title: `Essaye de dépasser les 10 km la semaine prochaine !`,
            accomplishment: `Tu as parcouru ${totalKm} km cette semaine.`
          });
        } else {
          this.challenges.push({
            title: `Continue sur ta lancée et vise 12 km la semaine prochaine !`,
            accomplishment: `Bravo ! Tu as déjà parcouru ${totalKm} km cette semaine.`
          });
        }

        // Challenge basé sur la meilleure distance
        this.challenges.push({
          title: `Essaie de battre ton record la semaine prochaine !`,
          accomplishment: `Ton meilleur kilométrage cette semaine est de ${bestDistance} km. Bravo !`
        });

        // Challenge basé sur l'allure moyenne
        this.challenges.push({
          title: `Essaie d'atteindre 8 km/h la semaine prochaine !`,
          accomplishment: `Ton allure moyenne cette semaine est de ${averagePace.toFixed(2)} km/h.`
        });

        // Challenge basé sur le nombre de jours courus
        if (daysRan < 3) {
          this.challenges.push({
            title: `Essaie de courir au moins 3 jours la semaine prochaine pour progresser !`,
            accomplishment: `Tu as couru ${daysRan} jours cette semaine.`
          });
        } else if (daysRan === 3) {
          this.challenges.push({
            title: `Essaie de courir 4 jours la semaine prochaine pour aller plus loin !`,
            accomplishment: `Bravo, tu as couru ${daysRan} jours cette semaine !`
          });
        } else if (daysRan > 4) {
          this.challenges.push({
            title: `Essaie de viser 5 jours la semaine prochaine pour encore plus de progrès !`,
            accomplishment: `Félicitations, tu as couru ${daysRan} jours cette semaine ! `
          });
        }

        // Challenge personnalisé : Encouragement à progresser
        if (bestDistance < 5) {
          this.challenges.push({
            title: `Pourquoi ne pas viser 5 km la semaine prochaine ?`,
            accomplishment: `Tu as parcouru un maximum de ${bestDistance} km cette semaine.`
          });
        } else if (bestDistance >= 5 && bestDistance < 10) {
          this.challenges.push({
            title: `Essaie de dépasser les 10 km la semaine prochaine !`,
            accomplishment: `Ton meilleur kilométrage est de ${bestDistance} km.`
          });
        } else {
          this.challenges.push({
            title: `Essaie de dépasser les 12 km la semaine prochaine !`,
            accomplishment: `Tu as déjà parcouru ${bestDistance} km, félicitations !`
          });
        }

        // Comparaison avec la progression de la semaine précédente
        const previousWeekData = this.previousWeekData;
        if (previousWeekData) {
          const previousKm = previousWeekData.datasets[0].data.reduce((sum: number) => sum + 1, 0);
          if (totalKm > previousKm) {
            this.challenges.push({
              title: `Félicitations ! Tu as couru plus de kilomètres que la semaine dernière : ${totalKm} km contre ${previousKm} km.`,
              accomplishment: `Tu as couru ${totalKm} km cette semaine, contre ${previousKm} km la semaine précédente.`
            });
          } else if (totalKm === previousKm) {
            this.challenges.push({
              title: `Tu as maintenu la même distance que la semaine dernière : ${totalKm} km. Essaie d'aller encore plus loin la semaine prochaine !`,
              accomplishment: `Tu as couru ${totalKm} km cette semaine, comme la semaine précédente.`
            });
          } else {
            this.challenges.push({
              title: `Tu as couru moins de kilomètres que la semaine dernière : ${totalKm} km contre ${previousKm} km. Reprends ton élan la semaine prochaine !`,
              accomplishment: `Tu as couru ${totalKm} km cette semaine, contre ${previousKm} km la semaine précédente.`
            });
          }
        }
      });
    }
  }
}
