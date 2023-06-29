import { Component, OnInit, inject } from '@angular/core';
import { NgIf, CurrencyPipe, AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ProductODetailService } from './product-o-detail.service';
import { StarComponent } from '../../shared/star.component';
import { combineLatest, map } from 'rxjs';

@Component({
  templateUrl: './product-o-detail.component.html',
  styleUrls: ['./product-o-detail.component.css'],
  standalone: true,
  imports: [NgIf, StarComponent, RouterLink, AsyncPipe, CurrencyPipe]
})
export class ProductODetailComponent implements OnInit {
  productDetailService = inject(ProductODetailService);

  // Observables
  product$ = this.productDetailService.selectedProduct$;
  loading$ = this.productDetailService.loadingData$;

  pageTitle$ = combineLatest([
    this.product$,
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
