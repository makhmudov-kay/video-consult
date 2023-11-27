import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SvgModule } from '../svg/svg.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormateDateFnsModule } from 'projects/agro-news/src/app/shared/formateDateFns/formateDateFns.module';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { CurrencyModule } from 'projects/advertisement/src/app/shared/pipes/currency/currency.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  imports: [
    CommonModule,
    SvgModule,
    TranslateModule,
    FormateDateFnsModule,

    /* NG-ZORRO */
    NzIconModule,
    NzEmptyModule,
    CurrencyModule,
    NzButtonModule,
    NzToolTipModule
  ],
  declarations: [PaymentComponent],
  exports: [PaymentComponent],
})
export class PaymentModule {}
