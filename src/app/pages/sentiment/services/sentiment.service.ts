import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/shared/constants';

import { environment } from '../../../../environments/environment';

import { ISentiment } from '../../../shared/models/sentiment';

@Injectable({
  providedIn: 'root',
})
export class SentimentService {
  private getinsiderSentimentURL = environment.API_URL + '/stock/insider-sentiment';

  constructor(private httpClient: HttpClient) {}

  getSentimentLast3Months(symbol: string): Observable<ISentiment> {
    const toDateObject = new Date();
    const [toDate] = toDateObject.toISOString().split('T');

    const params = new HttpParams().set('token', environment.API_TOKEN).set('symbol', symbol).set('from', '1900-01-01').set('to', toDate);
    return this.httpClient.get<ISentiment>(this.getinsiderSentimentURL, { params }).pipe(
      map((sentiments) => {
        sentiments.data = sentiments.data.slice(-3);
        sentiments.data.map((sentiment) => (sentiment.monthName = GlobalConstants.Months[sentiment.month]));
        return sentiments;
      }),
    );
  }
}
