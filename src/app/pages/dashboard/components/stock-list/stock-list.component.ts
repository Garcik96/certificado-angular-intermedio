import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

import { IButton } from '../../../../shared/models/button';
import { IStockCard } from '../../../../shared/models/stock-card';
import { IStockQuote } from '../../../../shared/models/stock-quote';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
})
export class StockListComponent implements OnInit {
  @Input() list!: IStockQuote[];
  @Input() dataButton!: IButton;
  @Input() iconDeleted!: boolean;

  @Output() deleteStockSelected = new EventEmitter<IStockQuote>();
  @Output() actionStockSelected = new EventEmitter<IStockQuote>();

  @ViewChild('itemTemplate') itemTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    setTimeout(() => {}, 0); //TODO -> change this (I use it to re-render the ng-container)
  }

  getStockCardData(stock: IStockQuote): IStockCard {
    return {
      itemTemplate: this.itemTemplate,
      dataStock: stock,
      dataButton: this.dataButton,
      iconDeleted: this.iconDeleted,
    };
  }

  deleteStockCard(stock: IStockQuote): void {
    this.deleteStockSelected.emit(stock);
  }

  actionStockCard(stock: IStockQuote): void {
    this.actionStockSelected.emit(stock);
  }
}
