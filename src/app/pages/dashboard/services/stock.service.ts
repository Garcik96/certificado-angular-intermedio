import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { IStockQuote } from '../../../shared/models/stock-quote';
import { ICompanies } from '../../../shared/models/company';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private getQuoteURL = environment.API_URL + '/quote';
  private getCompanyURL = environment.API_URL + '/search';

  constructor(private httpClient: HttpClient) {}

  getQuote(symbol: string): Observable<IStockQuote> {
    const params = new HttpParams().set('token', environment.API_TOKEN).set('symbol', symbol);
    return this.httpClient.get<IStockQuote>(this.getQuoteURL, { params });
  }

  getCompanyStock(symbol: string): Observable<ICompanies> {
    const params = new HttpParams().set('token', environment.API_TOKEN).set('q', symbol);
    return this.httpClient.get<ICompanies>(this.getCompanyURL, { params });
  }
}
