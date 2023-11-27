import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseTypeApplicationComponent } from './choose-type-application.component';
import { ChooseTypeApplicationRoutes } from './choose-type-application.routing';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    NzDividerModule,
    ChooseTypeApplicationRoutes,
    TranslateModule,
  ],
  declarations: [ChooseTypeApplicationComponent],
})
export class ChooseTypeApplicationModule {}
