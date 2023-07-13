import { ApplicationConfig, importProvidersFrom } from '@angular/core';

import { provideHttpClient } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/product-data';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom(InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }))
  ]
};
