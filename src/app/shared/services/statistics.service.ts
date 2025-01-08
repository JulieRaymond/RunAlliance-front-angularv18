import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private apiUrl = `${environment.apiUrl}/api/statistics`;

  constructor(private http: HttpClient) {
  }

  // Transformation des données hebdomadaires pour le graphique
  getWeeklyStatistics(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/weekly/${userId}`).pipe(
      map(response => {
        // Récupérer les dates et les distances
        const dates = Object.keys(response.dailyDistances);
        const distances = Object.values(response.dailyDistances);

        // Transformation des dates pour récupérer le jour de la semaine (optionnel)
        const labels = dates.map(date => {
          const day = new Date(date);
          const options: any = {weekday: 'short'}; // 'long' pour le jour complet
          return day.toLocaleDateString('fr-FR', options);
        });

        return {
          labels: labels,  // Jours de la semaine ou dates
          datasets: [
            {
              label: 'Distance quotidienne',
              data: distances, // Données des distances
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          ]
        };
      })
    );
  }

  // Transformation des données mensuelles pour le graphique
  getMonthlyStatistics(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/monthly/${userId}`).pipe(
      map(response => {
        // Récupérer les semaines et les distances
        const weeks = Object.keys(response.weeklyDistances);
        const distances = Object.values(response.weeklyDistances);

        return {
          labels: weeks,  // Numéros de semaines ou autres labels
          datasets: [
            {
              label: 'Distance hebdomadaire',
              data: distances, // Données des distances
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        };
      })
    );
  }
}
