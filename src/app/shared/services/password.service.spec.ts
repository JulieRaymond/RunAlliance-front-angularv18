import { TestBed } from '@angular/core/testing';

import { PasswordService } from './password.service';
import {provideHttpClient} from "@angular/common/http";

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient() // Utilisation de la nouvelle méthode pour fournir HttpClient
      ]
    });
    service = TestBed.inject(PasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
