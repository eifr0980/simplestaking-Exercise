import { Component, OnInit } from '@angular/core';
import config from '../../config.json';
import { TezosService } from '../tezos.service';
import Transaction from '../transaction';

@Component({
  selector: 'app-tezos-table',
  templateUrl: './tezos-table.component.html',
  styleUrls: ['./tezos-table.component.scss'],
})
export class TezosTableComponent implements OnInit {
  transactions: Transaction[];
  constructor(private dataService: TezosService) {}

  ngOnInit(): void {
    this.dataService
      .getTransactions()
      .subscribe((x) => (this.transactions = x));
  }
}
