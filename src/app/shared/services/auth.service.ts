import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {LoginResponse} from "../models/login.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/api/auth/login`;

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    const body = {email, password};
    return this.http.post<any>(this.apiUrl, body).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('jwtToken', response.token);
          console.log('Token stocké dans localStorage', response.token); // Debug
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
