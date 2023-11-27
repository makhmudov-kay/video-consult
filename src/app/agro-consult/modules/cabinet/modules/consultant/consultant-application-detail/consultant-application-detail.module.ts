import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantApplicationDetailComponent } from './consultant-application-detail.component';
import { ConsultantApplicationDetailRoutes } from './consultant-application-detail.routing';
import { SwiperModule } from 'swiper/angular';
import { UserInfoModule } from 'projects/agro-consult/src/app/shared/user-info/user-info.module';
import { FormsModule } from '@angular/forms';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { ApplicationDetailModule } from 'projects/agro-consult/src/app/shared/application-detail/application-detail.module';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@NgModule({
  imports: [
    CommonModule,
    ConsultantApplicationDetailRoutes,
    SwiperModule,
    UserInfoModule,
    FormsModule,
    ApplicationDetailModule,

    /* NG-ZORRO */
    NzImageModule,
    NzAvatarModule,
    NzDrawerModule
  ],
  declarations: [ConsultantApplicationDetailComponent],
})
export class ConsultantApplicationDetailModule {}
