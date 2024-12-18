import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from "../services/auth.service";

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Utiliser inject pour récupérer le service
  const token = authService.getAccessToken(); // Récupérer le token depuis le service ou localStorage

  if (token) {
    // Ajouter l'en-tête Authorization à la requête si un token est présent
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned); // Passer la requête modifiée à la suite du pipeline
  }

  return next(req); // Si aucun token, continuer sans modification
};
