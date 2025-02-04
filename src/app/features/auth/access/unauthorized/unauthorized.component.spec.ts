import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedComponent } from './unauthorized.component';
import {AuthService} from "../../../../shared/services/auth.service";
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";

describe('UnauthorizedComponent', () => {
  let component: UnauthorizedComponent;
  let fixture: ComponentFixture<UnauthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnauthorizedComponent],
      providers: [
        AuthService,
        provideHttpClient(), // Fournir HttpClient
        provideRouter([]) // Fournir un routeur vide ou ta configuration de routes
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
