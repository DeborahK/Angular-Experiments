import { Routes } from "@angular/router";
import { ProductSListComponent } from "./product-s-list.component";
import { ProductSDetailComponent } from "./product-s-detail.component";

export const PRODUCT_S_ROUTES: Routes = [
  { path: '', component: ProductSListComponent },
  {
      path: ':id',
      component: ProductSDetailComponent
  }
];