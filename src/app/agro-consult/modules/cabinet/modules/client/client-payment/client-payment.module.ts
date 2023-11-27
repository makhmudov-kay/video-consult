import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientPaymentComponent } from './client-payment.component';
import { ClientPaymentRoutes } from './client-payment.routing';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PaymentModule } from 'projects/agro-consult/src/app/shared/payment/payment.module';

@NgModule({
  imports: [CommonModule, ClientPaymentRoutes, PaymentModule, NzIconModule],
  declarations: [ClientPaymentComponent],
})
export class ClientPaymentModule {}
