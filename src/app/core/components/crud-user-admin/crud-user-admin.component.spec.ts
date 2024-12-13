import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudUserAdminComponent } from './crud-user-admin.component';

describe('CrudUserAdminComponent', () => {
  let component: CrudUserAdminComponent;
  let fixture: ComponentFixture<CrudUserAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudUserAdminComponent]
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
