import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumberString } from 'class-validator';
import { DEFAULT } from '../constans/default-constans';

export class CurrencyDto {
  @ApiProperty({
    example: 'apex',
    description: 'Your currency converting from',
    required: true,
  })
  @IsString()
  from: string;

  @ApiProperty({
    example: 'polinate',
    description: 'Convertible currency',
    required: false,
  })
  @IsString()
  @IsOptional()
  to?: string = DEFAULT.TO_CURRENCY;

  @ApiProperty({
    example: '10',
    description: 'Amount your currency',
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  amount?: string = DEFAULT.AMOUNT_VALUE;
}
