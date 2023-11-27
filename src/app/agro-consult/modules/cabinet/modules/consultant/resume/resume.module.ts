import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume.component';
import { ResumeRoutes } from './resume.routing';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { SvgModule } from 'projects/agro-consult/src/app/shared/svg/svg.module';
import { TranslateModule } from '@ngx-translate/core';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DeleteResumeModalComponent } from './components/delete-resume-modal/delete-resume-modal.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AsyncClickDirective } from 'projects/advertisement/src/app/shared/directives/async-click.directive';

@NgModule({
  imports: [
    CommonModule,
    ResumeRoutes,
    FormsModule,
    SvgModule,
    TranslateModule,

    /* NG-ZORRO */
    NzSwitchModule,
    NzPopconfirmModule,
    NzBadgeModule,
    NzEmptyModule,
    NzModalModule,
    NzButtonModule,
    AsyncClickDirective
  ],
  declarations: [
    ResumeComponent,
    ConfirmationModalComponent,
    DeleteResumeModalComponent,
  ],
})
export class ResumeModule {}
