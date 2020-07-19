import { Component, OnInit, ViewChild } from '@angular/core';
import Transaction from '../transaction';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getStateSelectedData } from '../tezos.selectors';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-tezos-table',
  templateUrl: './tezos-table.component.html',
  styleUrls: ['./tezos-table.component.scss'],
})
export class TezosTableComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, { static: false })
  public viewPort: CdkVirtualScrollViewport;

  transactions$: Observable<Transaction[]>;

  constructor(private store: Store<{ transactions }>) {
    this.transactions$ = store.select(getStateSelectedData);
  }

  ngOnInit(): void {
    this.store.dispatch({ type: '[Transactions Page] Load Transactions' });
  }

  updateData(e) {
    const end = this.viewPort.getRenderedRange().end;
    const total = this.viewPort.getDataLength();
    if (end === total) {
      this.store.dispatch({ type: '[Transactions Page] Load Transactions' });
    }
  }

  public get inverseOfTranslation(): string {
    if (!this.viewPort || !this.viewPort['_renderedContentOffset']) {
      return '-0px';
    }
    let offset = this.viewPort['_renderedContentOffset'];
    return `-${offset}px`;
  }
}
