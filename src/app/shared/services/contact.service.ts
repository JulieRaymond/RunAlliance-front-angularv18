import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, timeout} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/api/contact`;

  constructor(private http: HttpClient) {
  }

  sendEmail(contactForm: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, contactForm).pipe(
      timeout(10000) // Augmente le délai d'attente à 10 secondes
    );
  }
}
