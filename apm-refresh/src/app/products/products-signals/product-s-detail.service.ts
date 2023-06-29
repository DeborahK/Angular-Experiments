import { Injectable, computed, inject, signal } from '@angular/core';
import { ProductSService } from './product-s.service';

@Injectable({
  providedIn: 'root'
})
export class ProductSDetailService {
  private productService = inject(ProductSService);

  loadingData = this.productService.loadingData;

  // Writable signal for the selected product Id
  selectedProductId = signal<number | undefined>(undefined);

  // React to changes in the selected product id and get the selected product
  selectedProduct = computed(() =>
    this.productService.products().find(p => p.id === this.selectedProductId())
  );
}
