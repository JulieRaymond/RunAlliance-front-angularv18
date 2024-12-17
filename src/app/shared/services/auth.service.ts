import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {LoginResponse} from "../models/LoginResponse";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/api/auth/login`;
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

  isRefreshingToken = new BehaviorSubject<boolean>(false);
  refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
  }

  // Obtenir le token d'accès
  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  // Obtenir le token de rafraîchissement
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  // Rafraîchir le token
  refreshAccessToken(): Observable<any> {
    return this.http.post('/api/auth/refresh', {
      refreshToken: this.getRefreshToken(),
    });
  }

  // Sauvegarder les tokens
  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  // Supprimer les tokens et déconnecter l'utilisateur
  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    window.location.reload();
  }

  login(email: string, password: string): Observable<any> {
    const body = {email, password};
    return this.http.post<any>(this.apiUrl, body).pipe(
      tap(response => {
        if (response && response.accessToken && response.refreshToken) {
          // Enregistrer les tokens dans le localStorage
          localStorage.setItem('access_token', response.accessToken);
          localStorage.setItem('refresh_token', response.refreshToken);
          console.log('Tokens stockés dans localStorage', response.accessToken, response.refreshToken); // Debug
        } else {
          console.error("Réponse invalide, tokens manquants");
        }
      })
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<any>(`${environment.apiUrl}/api/auth/refresh`, {refreshToken}).pipe(
      tap(response => {
        if (response && response.accessToken) {
          localStorage.setItem('jwtToken', response.accessToken);
        }
      })
    );
  }

}
