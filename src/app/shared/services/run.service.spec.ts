import {TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';  // Importer HttpClientModule
import {RunService} from './run.service';

describe('RunService', () => {
  let service: RunService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient() // Utilisation de la nouvelle méthode pour fournir HttpClient
      ]
    });
    service = TestBed.inject(RunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
