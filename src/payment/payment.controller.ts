import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CalculateBillDto } from './DTO/calculate-bill.dto';
import { PaymentService } from './payment.service';

@Controller('api')
export class PaymentController {
  //
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/calcular-boleto')
  calcular(@Body() body: CalculateBillDto) {
    return this.paymentService.calculateBill(body);
  }

  @Get('/historico')
  showHistorics() {
    return this.paymentService.showHistoric();
  }

  @Get('/historico-detalhe')
  showBillsToPay() {
    return this.paymentService.showBillsToPay();
  }
}
