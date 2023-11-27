import { FormateDateFnsModule } from './../../../../../../../../agro-news/src/app/shared/formateDateFns/formateDateFns.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantComponent } from './consultant.component';
import { ConsultantRoutes } from './consultant.routing';
import { ConsultantAboutComponent } from './components/consultant-about/consultant-about.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { AttachedFilesComponent } from './components/attached-files/attached-files.component';
import { NzImageModule } from 'ng-zorro-antd/image';
import { SwiperModule } from 'swiper/angular';
import { ConsultantDescriptionComponent } from './components/consultant-description/consultant-description.component';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
import { CommentaryModule } from 'projects/agro-consult/src/app/shared/commentary/commentary.module';
import { SimilarConsultantComponent } from './components/similar-consultant/similar-consultant.component';
import { ConsultantCardModule } from 'projects/agro-consult/src/app/shared/consultant-card/consultant-card.module';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    ConsultantRoutes,
    SwiperModule,
    CommentaryModule,
    ConsultantCardModule,
    FormateDateFnsModule,
    TranslateModule,
    QuillModule,

    /* NG-ZORRO */
    NzGridModule,
    NzDividerModule,
    NzImageModule,
    NzSkeletonModule,
  ],
  declarations: [
    ConsultantComponent,
    ConsultantAboutComponent,
    AttachedFilesComponent,
    ConsultantDescriptionComponent,
    FeedbacksComponent,
    SimilarConsultantComponent,
  ],
})
export class ConsultantModule {}
