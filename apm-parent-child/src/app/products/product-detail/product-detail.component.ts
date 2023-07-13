import { Component, Input, booleanAttribute, numberAttribute } from '@angular/core';

import { NgIf, CurrencyPipe, CommonModule } from '@angular/common';
import { Product, toProductNameUpperCase} from '../product';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  standalone: true,
  imports: [NgIf, CurrencyPipe, CommonModule]
})
export class ProductDetailComponent {
  // Input properties
  @Input({
    required: true,
    transform: (value: Product | null) => ({
      ...value,
      productName: value?.productName.toLocaleUpperCase()
    })
  })
  product: Product | null = null;
  
  // @Input({
  //   required: true,
  //   transform: toProductNameUpperCase
  // })
  // product: Product | null = null;

  //@Input('displayDetail') detail = true;
  @Input({ alias: 'displayDetail' })
  detail = true;

  //@Input() imageWidth = 150;
  @Input({ transform: numberAttribute })
  imageWidth: string | number = 150;

  //@Input() includeImage = false;
  @Input({ transform: booleanAttribute })
  includeImage: string | boolean = false;

  @Input({ transform: (value: string) => value.toLocaleUpperCase()})
  imageTitle = '';
                           
  @Input({ transform: (value: string | number) => new Date(value)})
  availability: string | number | Date = new Date();

  pageTitle = () => {
    if (this.product) {
      return `${this.product.productName}`;
    } else {
      return 'Selected product not found';
    }
  };

}

