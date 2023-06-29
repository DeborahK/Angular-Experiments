import { Component, computed, inject, signal } from '@angular/core';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductSService } from './product-s.service';
import { Product } from '../product';
import { StarComponent } from '../../shared/star.component';

@Component({
    templateUrl: './product-s-list.component.html',
    styleUrls: ['./product-s-list.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, RouterLink, StarComponent, CurrencyPipe]
})
export class ProductSListComponent {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  errorMessage = '';

  private productService = inject(ProductSService);

  listFilter = signal('');
  showImage = signal(false);

  // Reference the products and loading signals from the service
  products = this.productService.products;
  loading = this.productService.loadingData;
  // Filter when the products or listfilter change
  filteredProducts = computed(() => this.performFilter(this.products(), this.listFilter()));

  onFilterChange(value: string) {
    this.listFilter.set(value);
  }

  performFilter(products: Product[], filterBy: string): Product[] {
    if (products.length && filterBy) {
      filterBy = filterBy.toLocaleLowerCase();
      return products.filter((product: Product) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    return products;
  }

  refreshData(): void {
    this.productService.refreshProducts();
  }

  toggleImage(): void {
    // Use the "not" operator to toggle from true to false or false to true
    this.showImage.update(flag => !flag);
  }

}
