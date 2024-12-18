import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RunService {

  private apiUrl = `${environment.apiUrl}/api/runs`;

  constructor(private http: HttpClient) {
  }

  // Récupérer toutes les courses
  getAllRuns(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {withCredentials: true});
  }

  // Créer une nouvelle course
  createRun(run: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, run, {withCredentials: true});
  }

  // Mettre à jour une course
  updateRun(run: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${run.runId}`, run, {withCredentials: true});
  }

  // Supprimer une course par son ID
  deleteRun(runId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${runId}`, {withCredentials: true});
  }

  // Supprimer plusieurs courses
  deleteRuns(runs: any[]): Observable<void> {
    const ids = runs.map(run => run.runId);
    return this.http.post<void>(`${this.apiUrl}/delete-multiple`, {ids}, {withCredentials: true});
  }
}
