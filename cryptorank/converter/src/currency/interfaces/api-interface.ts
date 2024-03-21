export interface CurrencyInterface {
  key: string;
  price: number;
  volume: number;
}

export interface ResponseDataInterface {
  data: CurrencyInterface[];
}
