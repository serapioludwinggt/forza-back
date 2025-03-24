import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BankService } from './application/service/bank.service';
import { MyBankRestIntegration } from './infrastructure/integration/my-bank-rest.integration';
import { BankController } from './infrastructure/controller/bank.controller';

@Module({
  imports: [HttpModule],
  providers: [BankService, MyBankRestIntegration],
  controllers: [BankController],
  exports: [BankService],
})
export class BankModule {}
