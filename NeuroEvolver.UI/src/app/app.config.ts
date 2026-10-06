import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { SimulationApi, MockSimulationApi } from './core/api/simulation.api';
import { EnvironmentApi, MockEnvironmentApi } from './core/api/environment.api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withHashLocation()),
    // Единственото място, където се избира Mock или Http реализация.
    { provide: EnvironmentApi, useClass: MockEnvironmentApi },
    { provide: SimulationApi, useClass: MockSimulationApi },
  ],
};
