import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantPaymentComponent } from './consultant-payment.component';
import { ConsultantPaymentRoutes } from './consultant-payment.routing';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PaymentModule } from 'projects/agro-consult/src/app/shared/payment/payment.module';

@NgModule({
  imports: [
    CommonModule,
    ConsultantPaymentRoutes,
    PaymentModule,
    
    /* NG-ZORRO */
    NzIconModule,
  ],
  declarations: [ConsultantPaymentComponent],
})
export class ConsultantPaymentModule {}
