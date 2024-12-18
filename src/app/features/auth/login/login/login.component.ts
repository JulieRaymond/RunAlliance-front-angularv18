import {Component} from '@angular/core';
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {PasswordModule} from "primeng/password";
import {SharedModule} from "../../../../shared/shared.module";
import {CheckboxModule} from "primeng/checkbox";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../../shared/services/auth.service";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PasswordModule,
    SharedModule,
    CheckboxModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';  // Pour afficher les messages d'erreur

  constructor(public layoutService: LayoutService, private authService: AuthService, private router: Router) {
  }

  onLogin(): void {
    this.authService.login(this.email, this.password).pipe(
      catchError(error => {
        this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
        return of(null);
      })
    ).subscribe(response => {
      if (response && response.accessToken && response.refreshToken) {
        this.authService.saveTokens(response.accessToken, response.refreshToken); // Enregistre les tokens

        const role = localStorage.getItem('role');

        // Redirige en fonction du rôle
        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/dashboard/admin']);  // Redirige vers le tableau de bord admin
        } else {
          this.router.navigate(['/me']);  // Redirige vers la page profil (par défaut)
        }
      } else {
        this.errorMessage = 'Échec de la connexion. Veuillez vérifier vos identifiants.';
      }
    });
  }
}
