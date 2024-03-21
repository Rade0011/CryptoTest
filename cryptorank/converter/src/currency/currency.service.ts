import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import Decimal from 'decimal.js';
import { ERROR_MESSAGE } from './constans/error-constans';
import { API } from './constans/api-constans';
import {
  CurrencyInterface,
  ResponseDataInterface,
} from './interfaces/api-interface';
import { DEFAULT } from './constans/default-constans';

@Injectable()
export class CurrencyService {
  async convertCurrency(from: string, to: string, amount: number) {
    let responseData: ResponseDataInterface;
    try {
      const response = await fetch(API.URL);
      responseData = await response.json();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    const dataCurrency = responseData.data;

    const fromCurrency = dataCurrency.find(
      (item: CurrencyInterface) => item.key === from,
    );
    const toCurrency = dataCurrency.find(
      (item: CurrencyInterface) => item.key === to,
    );

    if (!fromCurrency || !toCurrency) {
      throw new NotFoundException(ERROR_MESSAGE.CURRENCY_NOT_FOUND);
    }

    const fromCurrencyPrice = fromCurrency.price;
    const toCurrencyPrice = toCurrency.price;

    const result = this.calculateConversion(
      fromCurrencyPrice,
      toCurrencyPrice,
      amount,
    );

    return { amount, from, to, result };
  }

  calculateConversion(
    fromCurrencyPrice: number,
    toCurrencyPrice: number,
    amount: number,
  ) {
    const resultDecimal = new Decimal(amount)
      .times(fromCurrencyPrice)
      .dividedBy(toCurrencyPrice);

    if (resultDecimal.isFinite() === false || resultDecimal.isNaN()) {
      throw new BadRequestException(ERROR_MESSAGE.FAILED_TO_CONVERT);
    }
    const result = parseFloat(resultDecimal.toFixed(DEFAULT.ROUNDING_VALUE));

    return result;
  }
}
