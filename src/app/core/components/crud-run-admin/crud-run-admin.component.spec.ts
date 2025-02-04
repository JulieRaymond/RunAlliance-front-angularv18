import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRunAdminComponent } from './crud-run-admin.component';
import {AuthService} from "../../../shared/services/auth.service";
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";

describe('CrudRunAdminComponent', () => {
  let component: CrudRunAdminComponent;
  let fixture: ComponentFixture<CrudRunAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudRunAdminComponent],
      providers: [
        AuthService,
        provideHttpClient(), // Fournir HttpClient
        provideRouter([]), // Fournir un routeur vide ou ta configuration de routes
        ConfirmationService, // Ajouter le provider pour ConfirmationService
        MessageService // Ajouter le provider pour MessageService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudRunAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
