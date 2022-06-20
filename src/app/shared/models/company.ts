export interface ICompanies {
  count: number;
  result: ICompany[];
}

export interface ICompany {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}
