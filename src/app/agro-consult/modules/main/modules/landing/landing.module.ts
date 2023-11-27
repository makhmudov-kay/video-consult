import { UseabilityGuideModalComponent } from './components/useability-guide-modal/useability-guide-modal.component';
import { ConsultantCardModule } from './../../../../../shared/consultant-card/consultant-card.module';
import { ReviewCardComponent } from './components/reviews/review-card/review-card.component';
import { LandingRoutes } from './landing.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { LandingBannerComponent } from './components/landing-banner/landing-banner.component';
import { GuideComponent } from './components/guide/guide.component';
import { TopConsultantsComponent } from './components/top-consultants/top-consultants.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FAQComponent } from './components/f-a-q/f-a-q.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { SvgModule } from 'projects/agro-consult/src/app/shared/svg/svg.module';
import { ApplicationTypeModalModule } from '../shared/application-type-modal/application-type-modal.module';
import { TranslateModule } from '@ngx-translate/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { LanguageModule, SortModule, SortPipe } from 'ngx-az-core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { UserTypeComponent } from './components/useability-guide-modal/components/user-type/user-type.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { SliderComponent } from './components/landing-banner/components/slider/slider.component';
import { TgBotLinkComponent } from 'projects/agro-consult/src/app/shared/tg-bot-link/tg-bot-link.component';

@NgModule({
  imports: [
    CommonModule,
    LandingRoutes,
    ConsultantCardModule,
    FormsModule,
    SwiperModule,
    SvgModule,
    ApplicationTypeModalModule,
    TranslateModule,
    LanguageModule,
    FAQComponent,
    TgBotLinkComponent,

    /* NG-ZORRO */
    NzIconModule,
    NzTypographyModule,
    NzRateModule,
    NzAvatarModule,
    NzModalModule,
    NzDividerModule,
    NzDrawerModule,
    NzStepsModule,
    SortModule,
  ],
  declarations: [
    LandingComponent,
    LandingBannerComponent,
    GuideComponent,
    TopConsultantsComponent,
    ReviewsComponent,
    ReviewCardComponent,
    UseabilityGuideModalComponent,
    UserTypeComponent,
    SliderComponent,
  ],
  exports: [],
})
export class LandingModule {}
