import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationTypeModalComponent } from './application-type-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    /* NG-ZORRO */
    NzModalModule,
    NzDividerModule,
    NzRadioModule
  ],
  declarations: [ApplicationTypeModalComponent],
  exports: [ApplicationTypeModalComponent]
})
export class ApplicationTypeModalModule { }
