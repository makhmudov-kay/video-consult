import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsesComponent } from './responses.component';
import { ResponsesRoutes } from './responses.routing';
import { FormsModule } from '@angular/forms';
import { SearchInputModule } from 'projects/agro-consult/src/app/shared/search-input/search-input.module';
import { ApplicationFilterModule } from 'projects/agro-consult/src/app/shared/application-filter/application-filter.module';
import { ApplicationCardListModule } from 'projects/agro-consult/src/app/shared/application-card-list/application-card.module';
import { RadioGroupModule } from 'projects/agro-consult/src/app/shared/radio-group/radio-group.module';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { EmptyApplicationModule } from 'projects/agro-consult/src/app/shared/empty-application/empty-application.module';

@NgModule({
  imports: [
    CommonModule,
    ResponsesRoutes,
    FormsModule,
    SearchInputModule,
    ApplicationFilterModule,
    ApplicationCardListModule,
    RadioGroupModule,
    EmptyApplicationModule,

    /* NG-ZORRO */
    NzRadioModule,
    NzDrawerModule,
  ],
  declarations: [ResponsesComponent],
})
export class ResponsesModule {}
