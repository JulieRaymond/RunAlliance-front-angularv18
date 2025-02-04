import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudUserAdminComponent } from './crud-user-admin.component';
import {AuthService} from "../../../shared/services/auth.service";
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";

describe('CrudUserAdminComponent', () => {
  let component: CrudUserAdminComponent;
  let fixture: ComponentFixture<CrudUserAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudUserAdminComponent],
      providers: [
        AuthService,
        provideHttpClient(), // Fournir HttpClient
        provideRouter([]), // Fournir un routeur vide ou ta configuration de routes
        ConfirmationService, // Ajouter le provider pour ConfirmationService
        MessageService // Ajouter le provider pour MessageService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudUserAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
