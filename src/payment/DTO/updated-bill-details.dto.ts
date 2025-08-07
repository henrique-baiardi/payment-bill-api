import { IsInt, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class BillDetailsDto {
  @IsNumber()
  @Min(0)
  valor_original: number;

  @IsNumber()
  @Min(0)
  dias_em_atraso: number;

  @IsNumber()
  @Min(0)
  multa: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  juros: number;

  @IsNumber()
  @Min(0)
  valor_atualizado: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  parcelas?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  juros_parcelamento?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  valor_total_com_juros?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  valor_parcela?: number;
}
