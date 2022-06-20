import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IStockCard } from '../../models/stock-card';
import { IStockQuote } from '../../models/stock-quote';
import { IButton } from '../../models/button';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
})
export class StockCardComponent {
  @Input() data!: IStockCard;
  @Output() deleteStockSelected = new EventEmitter<IStockQuote>();
  @Output() actionStockSelected = new EventEmitter<IStockQuote>();

  clickDeleteButton(stock: IStockQuote): void {
    this.deleteStockSelected.emit(stock);
  }

  clickActionButton(stock: IStockQuote): void {
    this.actionStockSelected.emit(stock);
  }

  getDataButton(): IButton {
    return {
      text: this.data.dataButton!.text,
      type: this.data.dataButton!.type,
      action: () => {
        this.clickActionButton(this.data.dataStock);
      },
    };
  }
}
