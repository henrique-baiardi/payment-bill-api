import { BadRequestException, Injectable } from '@nestjs/common';
import { CalculateBillDto } from './DTO/calculate-bill.dto';
import { BillDetailsDto } from './DTO/updated-bill-details.dto';
import { UnprocessableInstallmentsException } from 'src/erros/unprocessableException';

@Injectable()
export class PaymentService {
  private paymentHistorics: CalculateBillDto[] = [
    {
      valor: 1000.0,
      vencimento: '2025-06-10',
      data_pagamento: '2025-06-23',
      parcelas: 3,
    },
  ];

  private billsDetails: BillDetailsDto[] = [];

  calculateBill(body: CalculateBillDto) {
    const { valor, vencimento, data_pagamento, parcelas } = body;

    const venc = new Date(vencimento);
    const pagamento = new Date(data_pagamento);

    if (isNaN(venc.getTime())) {
      throw new BadRequestException('Data de vencimento inválida.');
    }

    if (isNaN(pagamento.getTime())) {
      throw new BadRequestException('Data de pagamento inválida.');
    }

    if (valor <= 0) {
      throw new BadRequestException(
        'O valor do boleto deve ser maior que zero.',
      );
    }

    if (parcelas && parcelas < 1) {
      throw new UnprocessableInstallmentsException(
        'O número de parcelas deve ser maior ou igual a 1.',
      );
    }

    this.paymentHistorics.push(body);

    if (pagamento < venc) {
      return {
        valor_original: valor,
        dias_em_atraso: 0,
        multa: 0,
        juros: 0,
        valor_atualizado: valor,
      };
    }

    const diasEmAtraso = Math.floor(
      (pagamento.getTime() - venc.getTime()) / (1000 * 60 * 60 * 24),
    );

    const multa = +(valor * 0.02).toFixed(2);
    const juros = +(valor * 0.00033 * diasEmAtraso).toFixed(2);
    const valorAtualizado = +(valor + multa + juros).toFixed(2);

    const resultadoBase = {
      valor_original: valor,
      dias_em_atraso: diasEmAtraso,
      multa,
      juros,
      valor_atualizado: valorAtualizado,
    };

    if (!parcelas) return resultadoBase;

    const jurosParcelamento = +(valorAtualizado * 0.013 * parcelas).toFixed(2);
    const valorTotalComJuros = +(valorAtualizado + jurosParcelamento).toFixed(
      2,
    );
    const valorParcela = +(valorTotalComJuros / parcelas).toFixed(2);

    const result = {
      ...resultadoBase,
      parcelas,
      juros_parcelamento: jurosParcelamento,
      valor_total_com_juros: valorTotalComJuros,
      valor_parcela: valorParcela,
    };

    this.billsDetails.push(result);
    return result;
  }

  showHistoric() {
    return this.paymentHistorics;
  }

  showBillsToPay() {
    return this.billsDetails;
  }
}
