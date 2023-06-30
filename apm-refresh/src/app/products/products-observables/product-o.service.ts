import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, shareReplay, switchMap, tap, } from 'rxjs/operators';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class ProductOService {
  private productsUrl = 'api/products';
  private http = inject(HttpClient);

  // For the spinner
  private loadingData = new BehaviorSubject(true);
  loadingData$ = this.loadingData.asObservable();

  // To refresh the data from the server
  private refresh = new BehaviorSubject(true);
  refresh$ = this.refresh.asObservable();

  // Get the list of products
  // Whenever the data is refreshed
  products$ = this.refresh$.pipe(
    tap(() => this.loadingData.next(true)),
    switchMap(() => this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        finalize(() => this.loadingData.next(false)),
        catchError(this.handleError)
      )),
      shareReplay(1)
  )

  refreshProducts(): void {
    this.refresh.next(true);
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
