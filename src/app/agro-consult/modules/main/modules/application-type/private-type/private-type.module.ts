import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateTypeComponent } from './private-type.component';
import { PrivateTypeRoutes } from './private-type.routing';
import { ConsultantListModule } from '../../shared/consultant-list/consultant-list.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    PrivateTypeRoutes,
    ConsultantListModule,
    TranslateModule,
  ],
  declarations: [PrivateTypeComponent],
})
export class PrivateTypeModule {}
