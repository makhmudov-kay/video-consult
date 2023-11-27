import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SvgModule } from 'projects/agro-consult/src/app/shared/svg/svg.module';
import { MenuComponent } from './components/menu/menu.component';
import { ConsultantComponent } from './consultant.component';
import { ConsultantRoutes } from './consultant.routing';

@NgModule({
  imports: [CommonModule, ConsultantRoutes, SvgModule, TranslateModule],
  declarations: [ConsultantComponent, MenuComponent],
})
export class ConsultantModule {}
