import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { StockService } from './services/stock.service';

import { IStockQuote } from '../../shared/models/stock-quote';
import { IButton } from '../../shared/models/button';
import { ICompanies, ICompany } from '../../shared/models/company';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Search
  titleSearch!: string;
  buttonSearch!: IButton;
  formSearch!: FormGroup;

  // List
  stocks!: IStockQuote[];
  dataButtonItemsList!: IButton;
  actionDeleteStock!: Function;
  iconDeleted!: boolean;

  // Stock selected
  stockSelected!: IStockQuote;

  // Loading
  isLoading = false;

  // Subscriptions
  getQuoteSubscription!: Subscription;
  getCompanySubscription!: Subscription;

  get searchFormControl(): FormControl {
    return this.formSearch.get('search') as FormControl;
  }

  constructor(private formBuilder: FormBuilder, private stockService: StockService, private router: Router) {}

  ngOnInit(): void {
    this.setStocks();

    this.initSearchStockData();
    this.initListStocksData();
  }

  ngOnDestroy(): void {
    this.getQuoteSubscription?.unsubscribe();
    this.getCompanySubscription?.unsubscribe();
  }

  initSearchStockData(): void {
    this.titleSearch = 'Enter the symbol of a stock to track (i.e. AAPL, TSLA, MSFT, GOOGL)';
    this.buttonSearch = {
      text: 'Track Stock',
      type: 'submit',
      action: () => this.trackStock(),
    };
    this.formSearch = this.createForm();
  }

  initListStocksData(): void {
    this.stocks = this.getStocksFromLocalStorage();
    this.dataButtonItemsList = {
      text: 'Go to social sentiment details',
      type: 'button',
      action: () => {},
    };
    this.iconDeleted = true;
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      search: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
    });
  }

  trackStock(): void {
    this.isLoading = true;
    const symbol = this.searchFormControl.value.toUpperCase();
    this.getQuoteSubscription = this.stockService.getQuote(symbol).subscribe({
      next: (stock: IStockQuote) => {
        stock.symbol = symbol;
        this.getNameCompany(stock);
      },
      error: (error: HttpErrorResponse) => {
        alert(error);
      },
    });
  }

  getNameCompany(stock: IStockQuote): void {
    this.getCompanySubscription = this.stockService.getCompanyStock(stock.symbol!).subscribe({
      next: (companies: ICompanies) => {
        const comp = companies.result.find((company: ICompany) => {
          return company.symbol === stock.symbol;
        });
        stock.company = comp ? comp.description : '';
        this.addStockToLocalStorage(stock);
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        alert(error);
      },
    });
  }

  addStockToLocalStorage(stock: IStockQuote): void {
    let stocks = this.getStocksFromLocalStorage();

    let stockLocalStorage = stocks.find((s: IStockQuote) => {
      return s.symbol === stock.symbol;
    });

    if (stockLocalStorage) {
      this.deleteStock(stockLocalStorage);
      stocks = this.getStocksFromLocalStorage();
    }

    stocks.push(stock);
    this.setStocksFromLocalStorage(stocks);
  }

  getStocksFromLocalStorage(): IStockQuote[] {
    const stocksJson = localStorage.getItem('stocks');
    const stocks = stocksJson ? JSON.parse(stocksJson) : [];
    return stocks;
  }

  setStocksFromLocalStorage(stocks: IStockQuote[]): void {
    localStorage.setItem('stocks', JSON.stringify(stocks));
    this.setStocks();
  }

  deleteStock(stock: IStockQuote): void {
    const stocks = this.getStocksFromLocalStorage();
    const index = stocks.findIndex((s: IStockQuote) => {
      return s.symbol === stock.symbol;
    });
    stocks.splice(index, 1);
    this.setStocksFromLocalStorage(stocks);
  }

  setStocks(): void {
    this.stocks = this.getStocksFromLocalStorage();
  }

  goSentimentDetails(stock: IStockQuote): void {
    this.router.navigate([`sentiment/${stock.symbol}`]);
  }
}
