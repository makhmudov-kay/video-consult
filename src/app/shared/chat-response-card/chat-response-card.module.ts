import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatResponseCardComponent } from './chat-response-card.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyModule } from 'projects/advertisement/src/app/shared/pipes/currency/currency.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,

    /* NG-ZORRO */
    NzAvatarModule,
    NzTypographyModule,
    CurrencyModule,
  ],
  declarations: [ChatResponseCardComponent],
  exports: [ChatResponseCardComponent],
})
export class ChatResponseCardModule {}
