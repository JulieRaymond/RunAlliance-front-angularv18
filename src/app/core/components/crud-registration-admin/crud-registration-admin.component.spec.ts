import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRegistrationAdminComponent } from './crud-registration-admin.component';
import {AuthService} from "../../../shared/services/auth.service";
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";

describe('CrudRegistrationAdminComponent', () => {
  let component: CrudRegistrationAdminComponent;
  let fixture: ComponentFixture<CrudRegistrationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudRegistrationAdminComponent],
      providers: [
        AuthService,
        provideHttpClient(), // Fournir HttpClient
        provideRouter([]), // Fournir un routeur vide ou ta configuration de routes
        ConfirmationService, // Ajouter le provider pour ConfirmationService
        MessageService // Ajouter le provider pour MessageService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudRegistrationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
