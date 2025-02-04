import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunPublicListComponent } from './run-public-list.component';
import {AuthService} from "../../../shared/services/auth.service";
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";

describe('RunPublicListComponent', () => {
  let component: RunPublicListComponent;
  let fixture: ComponentFixture<RunPublicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunPublicListComponent],
      providers: [
        AuthService,
        provideHttpClient(), // Fournir HttpClient
        provideRouter([]) // Fournir un routeur vide ou ta configuration de routes
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunPublicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
