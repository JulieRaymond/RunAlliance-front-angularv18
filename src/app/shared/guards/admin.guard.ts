import {inject} from '@angular/core';
import {CanActivateChildFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";

export const adminGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && localStorage.getItem('role') === 'ROLE_ADMIN') {
    return true; // Autorise l'accès
  } else {
    router.navigate(['/access-denied']); // Redirige vers la page Unauthorized
    return false; // Bloque l'accès
  }
};
