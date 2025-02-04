import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http'; // Pour HttpClient
import { AuthService } from '../../../../shared/services/auth.service';
import { provideRouter } from '@angular/router'; // Nouvelle méthode pour configurer le router

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent], // Le composant standalone
      providers: [
        AuthService,
        provideHttpClient(), // Fournir HttpClient
        provideRouter([]) // Fournir un routeur vide ou ta configuration de routes
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
