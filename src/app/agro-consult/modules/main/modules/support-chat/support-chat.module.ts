import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportChatComponent } from './support-chat.component';
import { SupportChatRoutes } from './support-chat.routing';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SvgModule } from 'projects/agro-consult/src/app/shared/svg/svg.module';
import { TranslateModule } from '@ngx-translate/core';
import { SupportChatGeneralModule } from 'ngx-az-chat';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { FormatDateByLangPipe, HandleImgErrrorDirective } from 'ngx-az-core';

@NgModule({
  imports: [
    CommonModule,
    SupportChatRoutes,
    FormsModule,
    ReactiveFormsModule,
    SvgModule,
    TranslateModule,
    SupportChatGeneralModule,
    HandleImgErrrorDirective,
    FormatDateByLangPipe,
    
    /* NG-ZORRO */
    NzInputModule,
    NzSpinModule,
    NzAvatarModule,
    NzIconModule,
  ],
  declarations: [SupportChatComponent],
})
export class SupportChatModule {}
