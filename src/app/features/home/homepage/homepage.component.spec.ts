import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';
import { AuthService } from "../../../shared/services/auth.service";
import {ConfirmationService, MessageService} from 'primeng/api';  // Import du service ConfirmationService
import { provideHttpClient } from "@angular/common/http";
import { provideRouter } from "@angular/router";

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageComponent],
      providers: [
        AuthService,
        provideHttpClient(), // Fournir HttpClient
        provideRouter([]), // Fournir un routeur vide ou ta configuration de routes
        ConfirmationService, // Ajouter le provider pour ConfirmationService
        MessageService // Ajouter le provider pour MessageService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
