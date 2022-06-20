export interface ISentiment {
  symbol: string;
  data: IDataSentiment[];
}

export interface IDataSentiment {
  symbol: string;
  year: number;
  month: number;
  monthName: string;
  change: number;
  mspr: number;
}
