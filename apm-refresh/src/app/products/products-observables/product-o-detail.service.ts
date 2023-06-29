import { Injectable, inject } from '@angular/core';

import { ProductOService } from './product-o.service';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductODetailService {
  private productService = inject(ProductOService);

  loadingData$ = this.productService.loadingData$;

  // Observable for the selected product Id
  private selectedProductId = new BehaviorSubject<number | undefined>(undefined);
  selectedProductId$ = this.selectedProductId.asObservable();

  // React to changes in the selected product id and get the selected product
  selectedProduct$ = combineLatest([
    this.productService.products$,
    this.selectedProductId$
  ]).pipe(
    map(([products, selectedProductId]) =>
      products.find(product => product.id === selectedProductId)
    ),
  );

  setSelectedProduct(id: number | undefined): void {
    this.selectedProductId.next(id);
  }
}
