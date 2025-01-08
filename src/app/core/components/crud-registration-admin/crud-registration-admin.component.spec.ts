import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRegistrationAdminComponent } from './crud-registration-admin.component';

describe('CrudRegistrationAdminComponent', () => {
  let component: CrudRegistrationAdminComponent;
  let fixture: ComponentFixture<CrudRegistrationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudRegistrationAdminComponent]
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
