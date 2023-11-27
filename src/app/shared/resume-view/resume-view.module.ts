import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeViewComponent } from './resume-view.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzImageModule } from 'ng-zorro-antd/image';
import { RouterModule } from '@angular/router';
import { SvgModule } from '../svg/svg.module';
import { TranslateModule } from '@ngx-translate/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SvgModule,
    TranslateModule,

    FroalaViewModule,
    /* NG-ZORRO */
    NzAvatarModule,
    NzImageModule,
    NzAlertModule,
  ],
  declarations: [ResumeViewComponent],
  exports: [ResumeViewComponent],
})
export class ResumeViewModule {}
