import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http'; // Nouvelle méthode
import { ManageUsersService } from './manage-users.service';

describe('ManageUsersService', () => {
  let service: ManageUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient() // Utilisation de la nouvelle méthode pour fournir HttpClient
      ]
    });
    service = TestBed.inject(ManageUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
