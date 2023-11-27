import { FormateDateFnsModule } from './../../../../../agro-news/src/app/shared/formateDateFns/formateDateFns.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ApplicationCardComponent } from './application-card.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { FormatDateFnsPipe } from 'projects/agro-news/src/app/shared/formateDateFns/formatDateFns.pipe';
import { SvgModule } from '../svg/svg.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    FormateDateFnsModule,
    SvgModule,

    /* NG-ZORRO */
    NzAvatarModule,
    NzIconModule,
    NzTypographyModule,
  ],
  declarations: [ApplicationCardComponent],
  exports: [ApplicationCardComponent],
})
export class ApplicationCardListModule {}
