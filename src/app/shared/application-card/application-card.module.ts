import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationCardComponent } from './application-card.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, TranslateModule, NzTypographyModule],
  declarations: [ApplicationCardComponent],
  exports: [ApplicationCardComponent],
})
export class ApplicationCardModule {}
