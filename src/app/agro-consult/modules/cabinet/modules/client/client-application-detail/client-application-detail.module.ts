import { FormateDateFnsModule } from './../../../../../../../../../agro-news/src/app/shared/formateDateFns/formateDateFns.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientApplicationDetailComponent } from './client-application-detail.component';
import { ClientApplicationDetailRoutes } from './client-application-detail.routing';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { NzImageModule } from 'ng-zorro-antd/image';
import { ChatResponseCardModule } from 'projects/agro-consult/src/app/shared/chat-response-card/chat-response-card.module';
import { DetailApplicationComponent } from './components/detail-application/detail-application.component';
import { TranslateModule } from '@ngx-translate/core';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { SvgModule } from 'projects/agro-consult/src/app/shared/svg/svg.module';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [
    CommonModule,
    ClientApplicationDetailRoutes,
    FormsModule,
    SwiperModule,
    ChatResponseCardModule,
    TranslateModule,
    SvgModule,
    FormateDateFnsModule,

    /* NG-ZORRO */
    NzSwitchModule,
    NzImageModule,
    NzPopconfirmModule,
    NzMessageModule,
    NzAlertModule,
    NzAvatarModule,
    NzButtonModule,
  ],
  declarations: [ClientApplicationDetailComponent, DetailApplicationComponent],
})
export class ClientApplicationDetailModule {}
