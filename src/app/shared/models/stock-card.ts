import { TemplateRef } from '@angular/core';
import { IButton } from './button';
import { IDataSentiment } from './sentiment';
import { IStockQuote } from './stock-quote';

export interface IStockCard {
  itemTemplate: TemplateRef<any>;
  dataStock: IStockQuote;
  dataSentiment?: IDataSentiment[];
  dataButton?: IButton;
  iconDeleted?: boolean;
}
