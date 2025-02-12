import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
// Importa a função para registrar o locale e os dados para Angola
import { registerLocaleData } from '@angular/common';
import localePtAo from '@angular/common/locales/fr';

// Registra o locale 'pt-AO'
registerLocaleData(localePtAo, 'fr-FR');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
      // Define 'pt-AO' como locale padrão para toda a aplicação
      { provide: LOCALE_ID, useValue: 'fr-FR' }
  ]
};


