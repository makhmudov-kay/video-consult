import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatItemComponent } from './chat-item.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { SvgModule } from '../svg/svg.module';

@NgModule({
  imports: [
    CommonModule,
    NzTypographyModule,
    TranslateModule,
    NzAvatarModule,
    NzIconModule,
    SvgModule
  ],
  declarations: [ChatItemComponent],
  exports: [ChatItemComponent],
})
export class ChatItemModule {}
