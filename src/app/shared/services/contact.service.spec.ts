import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';
import {provideHttpClient} from "@angular/common/http";

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient() // Utilisation de la nouvelle méthode pour fournir HttpClient
      ]
    });
    service = TestBed.inject(ContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
