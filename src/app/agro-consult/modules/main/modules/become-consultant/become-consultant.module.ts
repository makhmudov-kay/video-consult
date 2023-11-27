import { SvgModule } from './../../../../../shared/svg/svg.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BecomeConsultantComponent } from './become-consultant.component';
import { BecomeConsultantRoutes } from './become-consultant.routing';
import { BannerComponent } from './components/banner/banner.component';
import { BannerCardComponent } from './components/banner/banner-card/banner-card.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UploadImgModule } from 'projects/agro-consult/src/app/shared/upload-img/upload-img.module';
import { ModalHeaderComponent } from './components/modal-header/modal-header.component';
import { ConfirmUserComponent } from './components/confirm-user/confirm-user.component';
import { ResumeSuccessComponent } from './components/resume-success/resume-success.component';
import { SpecializationComponent } from './components/specialization/specialization.component';
import { AdditionalInfoComponent } from './components/additional-info/additional-info.component';
import { ModalActionsComponent } from './components/modal-actions/modal-actions.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ResumePageComponent } from './components/resume-page/resume-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ResumeViewComponent } from './components/resume-view/resume-view.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { HandleImgErrrorDirective } from 'projects/ngx-az-core/src/lib/shared/directives/handle-img-error.directive';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import 'froala-editor/js/froala_editor.pkgd.min.js';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    BecomeConsultantRoutes,
    FormsModule,
    ReactiveFormsModule,
    UploadImgModule,
    TranslateModule,
    SvgModule,
    HandleImgErrrorDirective,

    FroalaEditorModule,
    FroalaViewModule,

    QuillModule,

    /* NG-ZORRO */
    NzModalModule,
    NzAvatarModule,
    NzStepsModule,
    NzSelectModule,
    NzInputModule,
    NzFormModule,
    NzIconModule,
    NzAlertModule,
    NzAlertModule,
  ],
  declarations: [
    BecomeConsultantComponent,
    BannerComponent,
    BannerCardComponent,
    ModalHeaderComponent,
    ConfirmUserComponent,
    SpecializationComponent,
    AdditionalInfoComponent,
    ResumeSuccessComponent,
    ModalActionsComponent,
    ResumePageComponent,
    AboutPageComponent,
    ResumeViewComponent,
  ],
  exports: [BecomeConsultantComponent],
})
export class BecomeConsultantModule {}
