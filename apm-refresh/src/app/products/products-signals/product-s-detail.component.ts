import { Component, OnInit, inject, computed } from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { StarComponent } from '../../shared/star.component';
import { NgIf, CurrencyPipe } from '@angular/common';
import { ProductSDetailService } from './product-s-detail.service';

@Component({
  templateUrl: './product-s-detail.component.html',
  styleUrls: ['./product-s-detail.component.css'],
  standalone: true,
  imports: [NgIf, StarComponent, RouterLink, CurrencyPipe]
})
export class ProductSDetailComponent implements OnInit {
  productDetailService = inject(ProductSDetailService);

  // Signals
  product = this.productDetailService.selectedProduct;
  loading = this.productDetailService.loadingData;

  pageTitle = computed(() => {
    if (this.loading()) {
      return 'Loading product...';
    } else if (this.product()) {
      return `Product Detail: ${this.product()?.productName}`;
    } else {
      return 'Selected product not found';
    }
  });

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Input property doesn't seem to work with standalone?
    this.route.params.subscribe(param =>
      this.productDetailService.selectedProductId.set(Number(param['id']))
    )
  }
}
