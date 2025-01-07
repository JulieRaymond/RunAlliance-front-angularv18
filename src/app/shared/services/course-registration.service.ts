import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CourseRegistrationDTO } from '../models/course-registration-dto.model';

@Injectable({
  providedIn: 'root'
})
export class CourseRegistrationService {
  private apiUrl = `${environment.apiUrl}/api/registrations`;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  getRegistrationsForRun(runId: number): Observable<CourseRegistrationDTO[]> {
    return this.http.get<CourseRegistrationDTO[]>(`${this.apiUrl}/run/${runId}`);
  }

  getRegistrationsByUserId(userId: number): Observable<CourseRegistrationDTO[]> {
    return this.http.get<CourseRegistrationDTO[]>(`${this.apiUrl}/users/${userId}`);
  }

  registerToCourse(runId: number): Observable<any> {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return new Observable<any>();
    }
    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        const registrationDto: CourseRegistrationDTO = { userId: user.id, runId };
        return this.http.post<any>(`${this.apiUrl}/register/${runId}`, registrationDto);
      })
    );
  }

  unregisterFromCourse(runId: number): Observable<any> {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return new Observable<any>();
    }
    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        return this.http.delete<any>(`${this.apiUrl}/unregister/${runId}/${user.id}`);
      })
    );
  }
}
