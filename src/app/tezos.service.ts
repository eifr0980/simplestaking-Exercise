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
  private currentID;

  constructor(private http: HttpClient) {}

  /** GET Transactions Observable */
  getTransactions(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(
        this.currentID ? this.url + '&cursor.lte=' + this.currentID : this.url
      )
      .pipe(
        tap((_) => this.log('fetched Transactions')),
        map((transactions) => {
          return transactions.map(
            (t): Transaction => {
              this.currentID = t[0];
              return {
                id: t[0],
                type: t[1],
                amount: t[2],
                date: t[3],
                address: t[4],
              };
            }
          );
        }),
        catchError((err) => {
          throw new Error('error in source. Details: ' + err);
        })
      );
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
