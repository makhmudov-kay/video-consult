import { ApplicationTypeModalModule } from './../shared/application-type-modal/application-type-modal.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';
import { BannerComponent } from './components/banner/banner.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TopCategoryComponent } from './components/top-category/top-category.component';
import { SwiperModule } from 'swiper/angular';
import { TopCategoryCardComponent } from './components/top-category/components/top-category-card/top-category-card.component';
import { TopConsultantsComponent } from './components/top-consultants/top-consultants.component';
import { ConsultantCardModule } from 'projects/agro-consult/src/app/shared/consultant-card/consultant-card.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MobileAppBannerComponent } from './components/mobile-app-banner/mobile-app-banner.component';
import { CategoryListModule } from 'projects/agro-consult/src/app/shared/category-list/category-list.module';
import { ClientApplicationCardModule } from 'projects/agro-consult/src/app/shared/client-application-card/client-application-card.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ConsultantListModule } from '../shared/consultant-list/consultant-list.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutes,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    ConsultantCardModule,
    TranslateModule,
    CategoryListModule,
    ClientApplicationCardModule,
    ConsultantListModule,
    ApplicationTypeModalModule,
    MobileAppBannerComponent,

    /* NG-ZORRO */
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule
  ],
  declarations: [
    HomeComponent,
    BannerComponent,
    TopCategoryComponent,
    TopCategoryCardComponent,
    TopConsultantsComponent,
  ],
})
export class HomeModule {}
