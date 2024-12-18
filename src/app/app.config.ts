import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";
import {jwtInterceptor} from "./shared/interceptors/jwt.interceptor";

export const appConfig: ApplicationConfig = {
  providers:
    [
      provideZoneChangeDetection({eventCoalescing: true}),
      provideRouter(routes),
      provideAnimations(),
      MessageService,
      ConfirmationService,
      provideHttpClient(withInterceptors([jwtInterceptor])),
    ]
};
