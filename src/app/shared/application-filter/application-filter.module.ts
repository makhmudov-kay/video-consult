import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationFilterComponent } from './application-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxMaskDirective,
    NzIconModule,
  ],
  declarations: [ApplicationFilterComponent],
  exports: [ApplicationFilterComponent],
})
export class ApplicationFilterModule {}
