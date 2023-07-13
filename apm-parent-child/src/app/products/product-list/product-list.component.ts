import { Component, inject, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

import { ProductService } from '../product.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [NgIf, NgFor, ProductDetailComponent]
})
export class ProductListComponent {
  private productService = inject(ProductService);

  pageTitle = 'Product List';
  showDetail = signal<boolean[]>([]);

  // Reference the signals from the service
  products = this.productService.products;

  toggle(index: number) {
    this.showDetail.mutate(arr => arr[index] = !arr[index]);
  }
}
