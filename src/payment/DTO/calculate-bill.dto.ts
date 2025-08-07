import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

//
export class CalculateBillDto {
  @IsNumber()
  @IsPositive()
  @Min(0)
  valor: number;

  @IsDateString()
  vencimento: string;

  @IsDateString()
  data_pagamento: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  parcelas?: number;
}
