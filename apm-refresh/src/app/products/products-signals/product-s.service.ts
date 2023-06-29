import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap, } from 'rxjs/operators';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class ProductSService {
  private productsUrl = 'api/products';
  private http = inject(HttpClient);

  loadingData = signal(true);

  // Get the list of products
  // Whenever the data is refreshed
  private refreshData = signal(true);
  private products$ = toObservable(this.refreshData).pipe(
    tap(() => this.loadingData.set(true)),
    switchMap(() => this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(() => this.loadingData.set(false)),
        catchError(this.handleError)
      ))
  )
  // Readonly signal
  products = toSignal(this.products$, { initialValue: [] as Product[] })

  refreshProducts(): void {
    // Every time this is called, toggle its value
    // The value must be toggled because the above toObservable()
    // only emits if the signal value *changes*
    this.refreshData.update(toggle => !toggle);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
