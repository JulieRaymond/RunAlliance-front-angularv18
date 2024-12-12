import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchLightComponent } from './switch-light.component';

describe('SwitchLightComponent', () => {
  let component: SwitchLightComponent;
  let fixture: ComponentFixture<SwitchLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchLightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
