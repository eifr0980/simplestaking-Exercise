import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from '../config.json';

import Transaction from './transaction';

import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TezosService {
  private url = config.apiUrl;
  private data: Transaction[] = [];
  public data$ = new Subject<Transaction[]>();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    this.updateTransactions();
  }

  /** GET Transactions Observable */
  getTransactions(): Observable<Transaction[]> {
    return this.data$.asObservable();
  }

  /** UPDATE Transactions from the server */
  updateTransactions(): void {
    this.http
      .get<Transaction[]>(this.url)
      .pipe(
        tap((_) => this.log('fetched Transactions')),
        catchError((err) => {
          throw new Error('error in source. Details: ' + err);
        })
      )
      .subscribe((newData) => {
        Array.prototype.push.apply(this.data, newData);
        this.data$.next(this.data);
        console.log(this.data);
      });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(
      '%c' + `Log: ${message}`,
      '' + `background: black; color: yellow`
    );
  }
}
