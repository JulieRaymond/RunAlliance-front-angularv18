import {TestBed} from '@angular/core/testing';

import {CourseRegistrationService} from './course-registration.service';
import {provideHttpClient} from "@angular/common/http";

describe('CourseRegistrationService', () => {
  let service: CourseRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient() // Utilisation de la nouvelle méthode pour fournir HttpClient
      ]
    });
    service = TestBed.inject(CourseRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
