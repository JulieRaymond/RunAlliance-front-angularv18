import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthService } from './shared/services/auth.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // Importation du composant standalone
      providers: [
        AuthService,
        provideHttpClient(withInterceptorsFromDi())
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render app-switch-light', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Détecte les changements
    const compiled = fixture.nativeElement as HTMLElement;
    const switchLightElement = compiled.querySelector('app-switch-light');
    expect(switchLightElement).toBeTruthy(); // Vérifie si le composant est rendu
  });

  it('should render router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Détecte les changements
    const compiled = fixture.nativeElement as HTMLElement;
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy(); // Vérifie si le <router-outlet> est présent
  });

});
