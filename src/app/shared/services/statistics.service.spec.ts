import { TestBed } from '@angular/core/testing';

import { StatisticsService } from './statistics.service';
import {provideHttpClient} from "@angular/common/http";

describe('StatisticsService', () => {
  let service: StatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient() // Utilisation de la nouvelle méthode pour fournir HttpClient
      ]
    });
    service = TestBed.inject(StatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
