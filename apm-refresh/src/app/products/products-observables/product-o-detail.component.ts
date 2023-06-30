import { Component, OnInit, inject } from '@angular/core';
import { NgIf, CurrencyPipe, AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, map, startWith, tap } from 'rxjs';

import { ProductODetailService } from './product-o-detail.service';
import { StarComponent } from '../../shared/star.component';
import { ProductOService } from './product-o.service';

@Component({
  templateUrl: './product-o-detail.component.html',
  styleUrls: ['./product-o-detail.component.css'],
  standalone: true,
  imports: [NgIf, StarComponent, RouterLink, AsyncPipe, CurrencyPipe]
})
export class ProductODetailComponent implements OnInit {
  productDetailService = inject(ProductODetailService);
  productService = inject(ProductOService);

  // Observables
  product$ = this.productDetailService.selectedProduct$;

  // If the user accessed the detail using a direct URL
  // the data will be loaded, so display loading indicator
  loading$ = this.productService.loadingData$;

  // When first loading, the product$ stream has not yet emitted
  // So use startWith to provide an initial emission
  pageTitle$ = combineLatest([
    this.product$.pipe(startWith(undefined)),
    this.loading$
  ]).pipe(
    map(([product, isLoading]) => {
      if (isLoading) {
        return 'Loading product...';
      } else if (product) {
        return `Product Detail: ${product.productName}`;
      } else {
        return 'Selected product not found';
      }
    })
  );

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Input property doesn't seem to work with standalone?
    this.route.params.subscribe(param =>
      this.productDetailService.setSelectedProduct(Number(param['id']))
    )
  }
}
