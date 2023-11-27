import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioGroupComponent } from './radio-group.component';
import { FormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,

    /* NG-ZORRO */
    NzRadioModule,
  ],
  declarations: [RadioGroupComponent],
  exports: [RadioGroupComponent],
})
export class RadioGroupModule {}
