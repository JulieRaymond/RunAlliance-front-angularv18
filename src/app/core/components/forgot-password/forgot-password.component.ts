import {Component} from '@angular/core';
import {SharedModule} from "../../../shared/shared.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordService} from "../../../shared/services/password.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private passwordService: PasswordService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      if (email) {
        this.passwordService.forgotPassword(email).subscribe({
          next: response => {
            this.successMessage = 'Un email de réinitialisation de mot de passe a été envoyé.';
            this.errorMessage = '';
          },
          error: error => {
            this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
            this.successMessage = '';
          }
        });
      }
    }
  }
}
