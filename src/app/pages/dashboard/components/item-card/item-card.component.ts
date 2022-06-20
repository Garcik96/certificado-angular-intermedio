import { Component, Input, OnInit } from '@angular/core';

import { IStockQuote } from '../../../../shared/models/stock-quote';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
})
export class ItemCardComponent implements OnInit {
  @Input() stock!: IStockQuote;
  trendingUp!: boolean;

  ngOnInit(): void {
    this.trendingUp = this.stock.dp! >= 0 ? true : false;
  }
}
