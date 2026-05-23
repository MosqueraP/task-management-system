import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

/**
 * Global Angular application configuration.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Global error handling
    provideBrowserGlobalErrorListeners(),

    // Application routing
    provideRouter(routes),

    // Enables HTTP communication with backend APIs
    provideHttpClient(),
  ],
};
