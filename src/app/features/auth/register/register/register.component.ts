import {Component} from '@angular/core';
import {SharedModule} from "../../../../shared/shared.module";
import {PasswordModule} from "primeng/password";
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../../shared/services/auth.service";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    SharedModule,
    PasswordModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  userPassword: any;
  userConfirmPassword: any;
  email: string = '';
  password: string = '';

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  // Méthode de soumission du formulaire d'inscription
  onSubmit() {
    if (this.userPassword === this.userConfirmPassword) {
      this.authService.register(this.email, this.userPassword).pipe(
        catchError(error => {
          console.error('Erreur d\'inscription', error);
          return of(null);  // Retourne un Observable vide en cas d'erreur
        })
      ).subscribe(response => {
        if (response) {
          console.log('Utilisateur inscrit avec succès', response);
          this.router.navigate(['/login']);  // Redirection après inscription
        }
      });
    } else {
      console.error('Les mots de passe ne correspondent pas');
    }
  }
}
