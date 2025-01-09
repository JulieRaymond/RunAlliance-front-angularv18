import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {CourseRegistrationDTO} from '../models/course-registration-dto.model';
import {ParticipantDTO} from "../models/participant-dto.model";

@Injectable({
  providedIn: 'root'
})
export class CourseRegistrationService {
  private apiUrl = `${environment.apiUrl}/api/registrations`;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  getAllRegistrations(): Observable<CourseRegistrationDTO[]> {
    return this.http.get<CourseRegistrationDTO[]>(this.apiUrl);
  }

  getRegistrationsForRun(runId: number): Observable<ParticipantDTO[]> {
    return this.http.get<ParticipantDTO[]>(`${this.apiUrl}/run/${runId}`);
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
        const registrationDto: CourseRegistrationDTO = {userId: user.id, runId};
        return this.http.post<any>(`${this.apiUrl}/register/${runId}`, registrationDto, {
          withCredentials: true
        });
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
          return this.getRegistrationId(user.id, runId).pipe(
            switchMap(registrationId => {
              return this.http.delete<any>(`${this.apiUrl}/unregister/${registrationId}`,
                {
                  withCredentials: true
                });
            })
          );
        }
      )
    );
  }

  getRegistrationId(userId: number, runId: number): Observable<number> {
    return this.http.get<CourseRegistrationDTO[]>(`${this.apiUrl}/users/${userId}`).pipe(
      switchMap(registrations => {
        const registration = registrations.find(reg => reg.runId === runId);
        if (registration) {
          return new Observable<number>(observer => {
            observer.next(registration.registrationId);
            observer.complete();
          });
        } else {
          throw new Error('Registration not found');
        }
      })
    );
  }

  // Nouvelle méthode pour supprimer une inscription
  deleteRegistration(registrationId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${registrationId}`);
  }

  // Nouvelle méthode pour mettre à jour une inscription
  updateRegistration(registrationId: number, updatedRegistration: CourseRegistrationDTO): Observable<CourseRegistrationDTO> {
    return this.http.put<CourseRegistrationDTO>(`${this.apiUrl}/${registrationId}`, updatedRegistration);
  }

  // Nouvelle méthode pour créer une inscription
  createRegistration(newRegistration: CourseRegistrationDTO): Observable<CourseRegistrationDTO> {
    return this.http.post<CourseRegistrationDTO>(this.apiUrl, newRegistration);
  }
}
