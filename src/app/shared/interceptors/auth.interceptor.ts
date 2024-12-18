import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, finalize, Observable, switchMap, take, throwError} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {environment} from "../../../environments/environment";

export const authInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const isRefreshing = inject(AuthService).isRefreshingToken;
  const refreshTokenSubject = inject(AuthService).refreshTokenSubject;
  const refreshUrl = `${environment.apiUrl}/api/auth/refresh`; // L'URL complète du backend

  // Ajouter l'en-tête Authorization avec le token d'accès
  const accessToken = authService.getAccessToken();
  let authReq = req;

  if (accessToken) {
    authReq = req.clone({
      setHeaders: {Authorization: `Bearer ${accessToken}`},
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !authReq.url.includes(refreshUrl)) {
        // Le token est expiré ou invalide, tenter un rafraîchissement
        return handle401Error(authService, authReq, next, isRefreshing, refreshTokenSubject);
      }
      return throwError(() => error);
    })
  );
};

// Gérer le cas 401 avec rafraîchissement du token
function handle401Error(
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  isRefreshing: BehaviorSubject<boolean>,
  refreshTokenSubject: BehaviorSubject<string | null>
): Observable<HttpEvent<any>> {
  if (!isRefreshing.value) {
    isRefreshing.next(true);
    refreshTokenSubject.next(null);

    return authService.refreshAccessToken().pipe(
      switchMap((tokens) => {
        authService.saveTokens(tokens.accessToken, tokens.refreshToken);
        refreshTokenSubject.next(tokens.accessToken);
        return next(
          req.clone({
            setHeaders: {Authorization: `Bearer ${tokens.accessToken}`},
          })
        );
      }),
      catchError((err) => {
        authService.logout();
        return throwError(() => err);
      }),
      finalize(() => isRefreshing.next(false))
    );
  } else {
    return refreshTokenSubject.pipe(
      filter((token) => token != null),
      take(1),
      switchMap((token) => {
        return next(
          req.clone({
            setHeaders: {Authorization: `Bearer ${token}`},
          })
        );
      })
    );
  }
}
