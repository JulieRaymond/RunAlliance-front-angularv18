import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/api/auth`;
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

  isRefreshingToken = new BehaviorSubject<boolean>(false);
  refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
  }

  // Méthode pour inscrire un nouvel utilisateur
  register(email: string, password: string): Observable<any> {
    const body = {email, password};
    return this.http.post<any>(`${this.apiUrl}/register`, body);
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
    return this.http.post(`${this.apiUrl}/refresh`, {
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
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }

  login(email: string, password: string): Observable<any> {
    const body = {email, password};
    return this.http.post<any>(`${this.apiUrl}/login`, body).pipe(
      tap(response => {
        if (response && response.accessToken && response.refreshToken) {
          // Enregistrer les tokens dans le localStorage
          localStorage.setItem('access_token', response.accessToken);
          localStorage.setItem('refresh_token', response.refreshToken);
          localStorage.setItem('role', response.role);
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

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  // getCurrentUser(): Observable<User> {
  //   const token = this.getAccessToken(); // Récupérer le token d'accès
  //   if (!token) {
  //     throw new Error('Token non trouvé'); // Gestion d'erreur si le token est manquant
  //   }
  //
  //   // Appel à l'API backend pour obtenir les informations utilisateur
  //   return this.http.get<User>(`${this.apiUrl}/me`, {
  //     headers: {Authorization: `Bearer ${token}`}
  //   });
  // }

  getCurrentUser(): Observable<User> {
    const token = this.getAccessToken(); // Récupérer le token d'accès
    if (!token) {
      throw new Error('Token non trouvé'); // Gestion d'erreur si le token est manquant
    }

    return this.http.get<User>(`${this.apiUrl}/me`, {
      headers: {Authorization: `Bearer ${token}`}
    }).pipe(
      catchError(err => {
        console.error('Erreur lors de la récupération de l’utilisateur:', err);
        this.logout(); // Déconnecter l'utilisateur en cas de token invalide
        throw err;
      })
    );
  }

}
