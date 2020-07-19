import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { TezosTableComponent } from './tezos-table/tezos-table.component';
import { TableModule } from 'mat-virtual-table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { transactionsReducer } from './data.reducer';
import { TransactionEffects } from './tezos.effects';

@NgModule({
  declarations: [AppComponent, TezosTableComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ transactions: transactionsReducer }, {}),
    HttpClientModule,
    TableModule,
    ScrollingModule,
    NgbModule,
    EffectsModule.forRoot([TransactionEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
