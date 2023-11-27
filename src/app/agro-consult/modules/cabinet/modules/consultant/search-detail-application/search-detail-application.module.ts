import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchDetailApplicationComponent } from './search-detail-application.component';
import { SearchDetailApplicationRoutes } from './search-detail-application.routing';
import { SwiperModule } from 'swiper/angular';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { UserInfoModule } from 'projects/agro-consult/src/app/shared/user-info/user-info.module';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { ApplicationDetailModule } from 'projects/agro-consult/src/app/shared/application-detail/application-detail.module';

@NgModule({
  imports: [
    CommonModule,
    SearchDetailApplicationRoutes,
    SwiperModule,
    UserInfoModule,
    FormsModule,
    ApplicationDetailModule,

    /* NG-ZORRO */
    NzImageModule,
    NzAvatarModule,
    NzModalModule,
    NzInputModule,
    NzDrawerModule,
  ],
  declarations: [SearchDetailApplicationComponent],
})
export class SearchDetailApplicationModule {}
