import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'az-client-payment',
  templateUrl: './client-payment.component.html',
  styleUrls: ['./client-payment.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientPaymentComponent {}
