import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import {AuthService} from "../../../shared/services/auth.service";
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordComponent],
      providers: [
        AuthService,
        provideHttpClient(), // Fournir HttpClient
        provideRouter([]) // Fournir un routeur vide ou ta configuration de routes
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
