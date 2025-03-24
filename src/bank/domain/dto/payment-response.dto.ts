export class PaymentResponseDto {
    transactionId: string;
    status: 'success' | 'failed';
    message?: string;
  }
  