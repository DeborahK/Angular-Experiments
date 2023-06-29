import { Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'products/O',
    loadChildren: () =>
      import('./products/products-observables/product-o.routes').then(r => r.PRODUCT_O_ROUTES)
  },
  {
    path: 'products/S',
    loadChildren: () =>
      import('./products/products-signals/product-s.routes').then(r => r.PRODUCT_S_ROUTES)
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then(c => c.AboutComponent)
  },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];
