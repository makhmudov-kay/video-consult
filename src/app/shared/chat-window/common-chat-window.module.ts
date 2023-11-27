import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UserInfoModule } from 'projects/agro-consult/src/app/shared/user-info/user-info.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import CommonChatWindowComponent from './common-chat-window.component';
import { RouterModule } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { SvgModule } from '../svg/svg.module';
import { MessagesWindowComponent } from './components/messages-window/messages-window.component';
import { AttachFilesComponent } from './components/attach-files/attach-files.component';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ActionGuideComponent } from './components/action-guide/action-guide.component';
import { CompleteModalComponent } from './components/complete-modal/complete-modal.component';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { ConfirmCompleteComponent } from './components/confirm-complete/confirm-complete.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { ConfirmContentComponent } from './components/confirm-complete/confirm-content/confirm-content.component';
import { OfferModalComponent } from './components/offer-modal/offer-modal.component';
import { OfferContentComponent } from './components/offer-modal/offer-content/offer-content.component';
import { ConvertTimeFormatPipe } from './components/pipe/convert-time-format.pipe';
// import { VideoCallComponent } from './components/video-call/video-call.component';
import { TranslateModule } from '@ngx-translate/core';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { FormatDateByLangPipe } from 'ngx-az-core';
import { NgxMaskDirective } from 'ngx-mask';
import { ChatHeaderComponent } from './components/chat-header/chat-header.component';
import { ChatApplicationCardComponent } from './components/chat-application-card/chat-application-card.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@NgModule({
  imports: [
    CommonModule,
    UserInfoModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SvgModule,
    ContentLoaderModule,
    TranslateModule,
    NgxMaskDirective,
    FormatDateByLangPipe,

    ChatHeaderComponent,
    UserComponent,
    ChatApplicationCardComponent,

    /* NG-ZORRO */
    NzInputModule,
    NzModalModule,
    NzAvatarModule,
    NzImageModule,
    NzIconModule,
    NzToolTipModule,
    NzFormModule,
    NzRateModule,
    NzStepsModule,
    NzDrawerModule,
    NzNotificationModule,
    NzMessageModule,
    NzButtonModule,
    NzDividerModule,
    NzSwitchModule,
  ],
  declarations: [
    CommonChatWindowComponent,
    MessagesWindowComponent,
    AttachFilesComponent,
    ActionGuideComponent,
    CompleteModalComponent,
    PaymentModalComponent,
    ConfirmCompleteComponent,
    ConfirmContentComponent,
    OfferModalComponent,
    OfferContentComponent,
    ConvertTimeFormatPipe,
    // VideoCallComponent,
  ],
  exports: [CommonChatWindowComponent],
})
export class CommonChatWindowModule {}
