import { Routes } from "@angular/router";
import { ProductOListComponent } from "./product-o-list.component";
import { ProductODetailComponent } from "./product-o-detail.component";

export const PRODUCT_O_ROUTES: Routes = [
  { path: '', component: ProductOListComponent },
  {
      path: ':id',
      component: ProductODetailComponent
  }
];