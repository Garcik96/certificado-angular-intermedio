import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { StockService } from '../dashboard/services/stock.service';
import { SentimentService } from './services/sentiment.service';

import { ICompanies, ICompany } from '../../shared/models/company';
import { IStockCard } from '../../shared/models/stock-card';
import { IStockQuote } from '../../shared/models/stock-quote';
import { IDataSentiment, ISentiment } from '../../shared/models/sentiment';
import { IButton } from '../../shared/models/button';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
})
export class SentimentComponent implements OnInit, OnDestroy {
  @ViewChild('itemTemplate') itemTemplate!: TemplateRef<any>;

  dataButton: IButton = {
    text: 'Back to list of stocks',
    type: 'button',
    action: () => {
      this.goToDashboard();
    },
  };

  stock: IStockQuote = {
    company: '',
    symbol: '',
  };
  cardData: IStockCard = {
    itemTemplate: this.itemTemplate,
    dataStock: this.stock,
  };

  sentiments!: IDataSentiment[];

  isLoading = true;
  sotckLoading = {
    companyNameLoading: false,
    sentimentLoading: false,
  };

  sentimentSubscription!: Subscription;
  urlParamsSubscription!: Subscription;
  getCompanySubscription!: Subscription;

  constructor(private sentimentService: SentimentService, private router: Router, private route: ActivatedRoute, private stockService: StockService) {}

  ngOnInit(): void {
    this.getUrlParams();
  }

  getUrlParams(): void {
    this.urlParamsSubscription = this.route.params.subscribe((params) => {
      const symbol = params['symbol'];
      this.stock.symbol = symbol;

      this.getSentimentLast3Months(symbol.toUpperCase());
      this.getNameCompany(symbol.toUpperCase());
    });
  }

  ngOnDestroy(): void {
    this.sentimentSubscription?.unsubscribe();
    this.urlParamsSubscription?.unsubscribe();
    this.getCompanySubscription?.unsubscribe();
  }

  getSentimentLast3Months(symbol: string): void {
    this.sentimentSubscription = this.sentimentService.getSentimentLast3Months(symbol).subscribe({
      next: (data: ISentiment) => {
        this.sentiments = data.data;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        alert(error);
      },
      complete: () => {
        this.sotckLoading.sentimentLoading = true;
        this.checkIsAllLoaded();
      },
    });
  }

  getNameCompany(symbol: string): void {
    this.getCompanySubscription = this.stockService.getCompanyStock(symbol).subscribe({
      next: (companies: ICompanies) => {
        const comp = companies.result.find((company: ICompany) => {
          return company.symbol === symbol;
        });
        this.stock.company = comp ? comp.description : '';
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        alert(error);
      },
      complete: () => {
        this.sotckLoading.companyNameLoading = true;
        this.checkIsAllLoaded();
      },
    });
  }

  getStockCardData(): IStockCard {
    return {
      itemTemplate: this.itemTemplate,
      dataStock: this.stock,
      dataSentiment: this.sentiments,
    };
  }

  checkIsAllLoaded(): void {
    let props = Object.values(this.sotckLoading);
    this.isLoading = props.some((prop) => !prop);
  }

  goToDashboard() {
    this.router.navigate(['']);
  }
}
