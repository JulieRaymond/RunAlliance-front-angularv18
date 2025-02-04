import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardUserComponent } from './dashboard-user.component';
import {AuthService} from "../../../shared/services/auth.service";
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";

describe('DashboardUserComponent', () => {
  let component: DashboardUserComponent;
  let fixture: ComponentFixture<DashboardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardUserComponent],
      providers: [
        AuthService,
        provideHttpClient(), // Fournir HttpClient
        provideRouter([]), // Fournir un routeur vide ou ta configuration de routes
        ConfirmationService, // Ajouter le provider pour ConfirmationService
        MessageService // Ajouter le provider pour MessageService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Détecte les changements dans le DOM
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
