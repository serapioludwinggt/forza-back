import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { BankService } from '../../application/service/bank.service';
import { InitiatePaymentDto } from '../../domain/dto/initiate-payment.dto';
import { JwtAuthGuard } from 'src/auth/application/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post('pay')
  async pay(@Body() dto: InitiatePaymentDto) {
    return this.bankService.initiatePayment(dto);
  }
}
