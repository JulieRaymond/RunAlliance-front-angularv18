import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { provideRouter } from '@angular/router';
import { LayoutService } from "../../../layout/service/app.layout.service";

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        LayoutService,  // Si LayoutService a des dépendances à injecter
        provideRouter([])  // Fournir un tableau vide de routes (ou ajouter des routes si nécessaire)
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
