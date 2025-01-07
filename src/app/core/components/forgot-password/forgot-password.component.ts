import {Component} from '@angular/core';
import {SharedModule} from "../../../shared/shared.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordService} from "../../../shared/services/password.service";
import {MessageService} from "primeng/api";
import {timer} from "rxjs";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private passwordService: PasswordService,
    private messageService: MessageService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      if (email) {
        this.passwordService.forgotPassword(email).subscribe({
          next: (response) => {
            timer(600).subscribe(() => {
              if (response.success) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Succès',
                  detail: response.message, // Affiche le message de succès
                });
              } else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Erreur',
                  detail: response.message, // Affiche le message d'erreur
                });
              }
            });
          },
          error: (error) => {
            console.error('API Error Response:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Impossible d\'envoyer l\'email. Veuillez réessayer.',
            });
          },
        });
      }
    }
  }
}
