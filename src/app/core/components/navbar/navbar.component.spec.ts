import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {AuthService} from "../../../shared/services/auth.service";
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        AuthService,
        provideHttpClient(), // Fournir HttpClient
        provideRouter([]), // Fournir un routeur vide ou ta configuration de routes
        ConfirmationService, // Ajouter le provider pour ConfirmationService
        MessageService // Ajouter le provider pour MessageService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
