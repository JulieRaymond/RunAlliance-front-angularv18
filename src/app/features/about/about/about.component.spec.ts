import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { AuthService } from "../../../shared/services/auth.service";
import { provideHttpClient } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import du module d'animations

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AboutComponent,
        BrowserAnimationsModule // Ajout du module d'animations
      ],
      providers: [
        AuthService,
        provideHttpClient(), // Fournir HttpClient
        provideRouter([]), // Fournir un routeur vide ou ta configuration de routes
        ConfirmationService, // Ajouter le provider pour ConfirmationService
        MessageService // Ajouter le provider pour MessageService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
