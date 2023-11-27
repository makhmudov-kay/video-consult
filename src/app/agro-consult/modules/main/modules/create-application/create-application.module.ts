import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateApplicationComponent } from './create-application.component';
import { CreateApplicationRoutes } from './create-application.routing';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CategoryListModule } from 'projects/agro-consult/src/app/shared/category-list/category-list.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { StepFirstComponent } from './components/step-first/step-first.component';
import { StepHeaderComponent } from './components/step-header/step-header.component';
import { StepSecondComponent } from './components/step-second/step-second.component';
import { StepThirdComponent } from './components/step-third/step-third.component';
import { StepFourthComponent } from './components/step-fourth/step-fourth.component';
import { StepFifthComponent } from './components/step-fifth/step-fifth.component';
import { ApplicationCardModule } from 'projects/agro-consult/src/app/shared/application-card/application-card.module';
import { StepActionsComponent } from './components/step-actions/step-actions.component';
import { UploadImgModule } from 'projects/agro-consult/src/app/shared/upload-img/upload-img.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NgxMaskDirective } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    CreateApplicationRoutes,
    FormsModule,
    ReactiveFormsModule,
    CategoryListModule,
    TranslateModule,
    ApplicationCardModule,
    UploadImgModule,
    NgxMaskDirective,

    /* NG-ZORRO */
    NzStepsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzRadioModule,
    NzModalModule,
    NzUploadModule,
    NzDividerModule,
    NzDatePickerModule,
    NzButtonModule,
    NzResultModule,
    NzAlertModule,
  ],
  declarations: [
    CreateApplicationComponent,
    StepHeaderComponent,
    StepFirstComponent,
    StepSecondComponent,
    StepThirdComponent,
    StepFourthComponent,
    StepFifthComponent,
    StepActionsComponent,
  ],
})
export class CreateApplicationModule {}
