import { Component, computed, inject, signal } from '@angular/core';
import { NgIf, NgFor, CurrencyPipe, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductOService } from './product-o.service';
import { Product } from '../product';
import { StarComponent } from '../../shared/star.component';
import { catchError, tap } from 'rxjs';

@Component({
  templateUrl: './product-o-list.component.html',
  styleUrls: ['./product-o-list.component.css'],
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, StarComponent, AsyncPipe, CurrencyPipe]
})
export class ProductOListComponent {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  errorMessage = '';

  private productService = inject(ProductOService);

  filteredProducts: Product[] = [];
  listFilter = signal('');
  showImage = signal(false);

  // Reference the products and loading Observables from the service
  products$ = this.productService.products$.pipe(
    // Filter when the products are returned
    tap(p => this.filteredProducts = this.performFilter(p, this.listFilter())),
    catchError(err => this.errorMessage = err)
  );
  loading$ = this.productService.loadingData$;

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
