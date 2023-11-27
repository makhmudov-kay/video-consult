import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientApplicationCardComponent } from './client-application-card.component';
import { RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { FormateDateFnsModule } from 'projects/agro-news/src/app/shared/formateDateFns/formateDateFns.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormateDateFnsModule,

    /* NG-ZORRO */
    NzAvatarModule,
    NzToolTipModule,
  ],
  declarations: [ClientApplicationCardComponent],
  exports: [ClientApplicationCardComponent],
})
export class ClientApplicationCardModule {}
