import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControlOptions, AbstractControl} from "@angular/forms";
import {PasswordService} from "../../../shared/services/password.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  resetPasswordForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private passwordService: PasswordService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const formOptions: AbstractControlOptions = {
      validators: this.passwordMatchValidator
    };
    this.resetPasswordForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      },
      formOptions
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: params => {
        this.token = params['token'];
      },
      error: error => {
        console.error('Erreur lors de la récupération des paramètres : ', error);
      }
    });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : {mismatch: true};
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;
      if (newPassword && this.token) {
        this.passwordService.resetPassword(this.token, newPassword).subscribe({
          next: response => {
            this.successMessage = 'Votre mot de passe a été réinitialisé avec succès.';
            this.errorMessage = '';
            this.router.navigate(['/login']);
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
