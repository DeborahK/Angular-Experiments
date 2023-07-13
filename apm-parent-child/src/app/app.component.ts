import { Component } from '@angular/core';
import { ProductListComponent } from './products/product-list/product-list.component';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ProductListComponent]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
}
