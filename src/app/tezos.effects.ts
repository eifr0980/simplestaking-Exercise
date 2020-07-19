import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TezosService } from './tezos.service';
import { GetAction, ApiSuccess } from './data.actions';

@Injectable()
export class TransactionEffects {
  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAction),
      mergeMap(() =>
        this.transactionsService.getTransactions().pipe(
          map((res) => ApiSuccess({ data: res })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private transactionsService: TezosService
  ) {}
}
