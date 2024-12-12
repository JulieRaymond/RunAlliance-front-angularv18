import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunPublicListComponent } from './run-public-list.component';

describe('RunPublicListComponent', () => {
  let component: RunPublicListComponent;
  let fixture: ComponentFixture<RunPublicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunPublicListComponent]
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
