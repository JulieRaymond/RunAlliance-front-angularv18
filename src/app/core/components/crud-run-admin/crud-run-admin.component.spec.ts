import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRunAdminComponent } from './crud-run-admin.component';

describe('CrudRunAdminComponent', () => {
  let component: CrudRunAdminComponent;
  let fixture: ComponentFixture<CrudRunAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudRunAdminComponent]
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
