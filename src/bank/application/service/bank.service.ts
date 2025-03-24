import { Injectable } from '@nestjs/common';
import { InitiatePaymentDto } from '../../domain/dto/initiate-payment.dto';
import { PaymentResponseDto } from '../../domain/dto/payment-response.dto';
import { MyBankRestIntegration } from '../../infrastructure/integration/my-bank-rest.integration';

@Injectable()
export class BankService {
  constructor(private readonly bankIntegration: MyBankRestIntegration) {}

  async initiatePayment(dto: InitiatePaymentDto): Promise<PaymentResponseDto> {
    return this.bankIntegration.sendPaymentRequest(dto);
  }
}
