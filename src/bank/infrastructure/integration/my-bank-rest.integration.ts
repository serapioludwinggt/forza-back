import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { InitiatePaymentDto } from '../../domain/dto/initiate-payment.dto';
import { PaymentResponseDto } from '../../domain/dto/payment-response.dto';

@Injectable()
export class MyBankRestIntegration {
  private readonly logger = new Logger(MyBankRestIntegration.name);

  constructor(private readonly http: HttpService) {}

  async sendPaymentRequest(data: InitiatePaymentDto): Promise<PaymentResponseDto> {
    const bankApiUrl = 'https://api.mybank.com/payments';

    try {
      const response$ = this.http.post(bankApiUrl, data, {
        headers: {
          Authorization: `Bearer ${process.env.BANK_API_KEY}`,
        },
      });

      const response = await lastValueFrom(response$);
      this.logger.log(`Payment response: ${JSON.stringify(response.data)}`);

      return {
        transactionId: response.data.id,
        status: 'success',
        message: response.data.message,
      };
    } catch (error) {
      this.logger.error('Error sending payment to bank', error?.response?.data || error.message);
      throw new InternalServerErrorException('Failed to process payment with the bank');
    }
  }
}
