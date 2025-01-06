import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {CourseRegistrationDTO} from "../models/course-registration-dto.model";

@Injectable({
    providedIn: 'root'
})
export class CourseRegistrationService {
    private apiUrl = `${environment.apiUrl}/api/registrations`;

    constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    }

    getRegistrationsForRun(runId: number): Observable<CourseRegistrationDTO[]> {
        return this.http.get<CourseRegistrationDTO[]>(`${this.apiUrl}/run/${runId}`);
    }

    registerToCourse(runId: number): Observable<any> {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login']);
            return new Observable<any>();
        }

        return this.authService.getCurrentUser().pipe(
            switchMap(user => {
                const registrationDto: CourseRegistrationDTO = {userId: user.id, runId};
                return this.http.post<any>(`${this.apiUrl}/register/${runId}`, registrationDto);
            })
        );
    }

    unregisterFromCourse(runId: number): Observable<any> {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login']);
            return new Observable<any>();
        }

        // Utiliser getCurrentUser pour obtenir l'utilisateur connecté
        return this.authService.getCurrentUser().pipe(
            switchMap(user => {
                return this.http.delete<any>(`${this.apiUrl}/unregister/${runId}/${user.id}`);
            })
        );
    }
}
