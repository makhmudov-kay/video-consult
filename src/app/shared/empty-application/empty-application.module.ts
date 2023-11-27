import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyApplicationComponent } from './empty-application.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@NgModule({
  imports: [CommonModule, NzEmptyModule, TranslateModule],
  declarations: [EmptyApplicationComponent],
  exports: [EmptyApplicationComponent],
})
export class EmptyApplicationModule {}
