import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantCardComponent } from './consultant-card.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { RouterModule } from '@angular/router';
import { FormateDateFnsModule } from 'projects/agro-news/src/app/shared/formateDateFns/formateDateFns.module';
import { TranslateModule } from '@ngx-translate/core';
import { HandleImgErrrorDirective } from 'projects/ngx-az-core/src/lib/shared/directives/handle-img-error.directive';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@NgModule({
  imports: [
    CommonModule,
    NzTypographyModule,
    RouterModule,
    FormateDateFnsModule,
    TranslateModule,
    HandleImgErrrorDirective,
    NzSkeletonModule,
  ],
  declarations: [ConsultantCardComponent],
  exports: [ConsultantCardComponent],
})
export class ConsultantCardModule {}
