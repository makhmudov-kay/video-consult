import { FormateDateFnsModule } from './../../../../../agro-news/src/app/shared/formateDateFns/formateDateFns.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationDetailComponent } from './application-detail.component';
import { UserInfoModule } from '../user-info/user-info.module';
import { RouterModule } from '@angular/router';
import { NzImageModule } from 'ng-zorro-antd/image';
import { SendProposalModalComponent } from './components/send-proposal-modal/send-proposal-modal.component';
import { ProposalContentComponent } from './components/proposal-content/proposal-content.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { SvgModule } from '../svg/svg.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NgxMaskDirective } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    UserInfoModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SvgModule,
    FormateDateFnsModule,
    TranslateModule,
    NgxMaskDirective,

    /* NG-ZORRO */
    NzImageModule,
    NzInputModule,
    NzDrawerModule,
    NzModalModule,
    NzSelectModule,
    NzMessageModule,
    NzFormModule,
    NzButtonModule,
    NzAlertModule,
  ],
  declarations: [
    ApplicationDetailComponent,
    SendProposalModalComponent,
    ProposalContentComponent,
  ],
  exports: [
    ApplicationDetailComponent,
    SendProposalModalComponent,
    ProposalContentComponent,
  ],
})
export class ApplicationDetailModule {}
