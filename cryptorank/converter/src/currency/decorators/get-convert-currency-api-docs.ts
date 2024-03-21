import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ERROR_MESSAGE } from '../constans/error-constans';

export function GetConvertCurrencyApiDocs() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Convert currency' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Convert currency successfully',
      schema: {
        example: {
          amount: 1,
          from: 'apex',
          to: 'ethereum',
          result: 0.0234,
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: ERROR_MESSAGE.FAILED_TO_CONVERT,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: ERROR_MESSAGE.CURRENCY_NOT_FOUND,
    }),
  );
}
