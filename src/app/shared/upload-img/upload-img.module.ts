import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadImgComponent } from './upload-img.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  imports: [
    CommonModule,

    /* NG-ZORRO */
    NzIconModule
  ],
  declarations: [UploadImgComponent],
  exports: [UploadImgComponent]
})
export class UploadImgModule { }
