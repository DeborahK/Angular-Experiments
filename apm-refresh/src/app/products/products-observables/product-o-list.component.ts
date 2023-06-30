import { Component, inject } from '@angular/core';
import { NgIf, NgFor, CurrencyPipe, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductOService } from './product-o.service';
import { Product } from '../product';
import { StarComponent } from '../../shared/star.component';
import { BehaviorSubject, EMPTY, catchError, combineLatest, map, tap } from 'rxjs';

@Component({
  templateUrl: './product-o-list.component.html',
  styleUrls: ['./product-o-list.component.css'],
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, StarComponent, AsyncPipe, CurrencyPipe]
})
export class ProductOListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  showImage = false;

  private productService = inject(ProductOService);

  // Define an action for a change to the list filter
  private listFilter = new BehaviorSubject('');
  listFilter$ = this.listFilter.asObservable();

  // Reference the products and loading Observables from the service
  products$ = this.productService.products$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
  loading$ = this.productService.loadingData$;

  // Filter when the products are returned
  // Or when the list filter changes
  filteredProducts$ = combineLatest([
    this.products$,
    this.listFilter$
  ]).pipe(
    map(([products, filter]) => this.performFilter(products, filter))
  );

  onFilterChange(value: string) {
    this.listFilter.next(value);
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
    this.showImage = !this.showImage;
  }

}
