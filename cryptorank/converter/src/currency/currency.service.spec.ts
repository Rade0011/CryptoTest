import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyService],
    }).compile();

    service = module.get<CurrencyService>(CurrencyService);
  });

  it('should be correctly calculated', () => {
    const fromCurrencyPrice = 0.03244;
    const toCurrencyPrice = 0.3123;
    const amount = 5;

    const result = service.calculateConversion(
      fromCurrencyPrice,
      toCurrencyPrice,
      amount,
    );
    expect(result).toEqual(0.5193724);
  });
});
