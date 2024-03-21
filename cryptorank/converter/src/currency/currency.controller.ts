import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyDto } from './dto/currency.dto';
import { GetConvertCurrencyApiDocs } from './decorators/get-convert-currency-api-docs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('convert')
  @GetConvertCurrencyApiDocs()
  async convertCurrency(@Query() currencyDto: CurrencyDto) {
    return this.currencyService.convertCurrency(
      currencyDto.from,
      currencyDto.to,
      +currencyDto.amount,
    );
  }
}
