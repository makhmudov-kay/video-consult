import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsesDetailComponent } from './responses-detail.component';
import { ResponsesDetailRoutes } from './responses-detail.routing';
import { SwiperModule } from 'swiper/angular';
import { UserInfoModule } from 'projects/agro-consult/src/app/shared/user-info/user-info.module';
import { FormsModule } from '@angular/forms';
import { ApplicationDetailModule } from 'projects/agro-consult/src/app/shared/application-detail/application-detail.module';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ResponsesDetailRoutes,
    SwiperModule,
    UserInfoModule,
    FormsModule,
    ApplicationDetailModule,
    TranslateModule,

    /* NG-ZORRO */
    NzImageModule,
    NzAvatarModule,
    NzDrawerModule,
  ],
  declarations: [ResponsesDetailComponent],
})
export class ResponsesDetailModule {}
