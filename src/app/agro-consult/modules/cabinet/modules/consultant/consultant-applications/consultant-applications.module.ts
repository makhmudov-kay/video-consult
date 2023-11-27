import { DrawerModule } from './../../../../../../shared/drawer/drawer.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantApplicationsComponent } from './consultant-applications.component';
import { ConsultantApplicationsRoutes } from './consultant-applications.routing';
import { SearchInputModule } from 'projects/agro-consult/src/app/shared/search-input/search-input.module';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { ApplicationCardListModule } from 'projects/agro-consult/src/app/shared/application-card-list/application-card.module';
import { ApplicationFilterModule } from 'projects/agro-consult/src/app/shared/application-filter/application-filter.module';
import { RadioGroupModule } from 'projects/agro-consult/src/app/shared/radio-group/radio-group.module';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { EmptyApplicationModule } from 'projects/agro-consult/src/app/shared/empty-application/empty-application.module';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@NgModule({
  imports: [
    CommonModule,
    ConsultantApplicationsRoutes,
    FormsModule,
    SearchInputModule,
    ApplicationFilterModule,
    ApplicationCardListModule,
    RadioGroupModule,
    EmptyApplicationModule,
    DrawerModule,

    /* NG-ZORRO */
    NzRadioModule,
    NzDrawerModule,
    NzEmptyModule,
    NzSkeletonModule
  ],
  declarations: [ConsultantApplicationsComponent],
})
export class ConsultantApplicationsModule {}
