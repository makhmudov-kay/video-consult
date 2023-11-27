import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetComponent } from './cabinet.component';
import { CabinetRoutes } from './cabinet.routing';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CabinetMenuComponent } from './components/cabinet-menu/cabinet-menu.component';
import { SwiperModule } from 'swiper/angular';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { SvgModule } from '../../../shared/svg/svg.module';

@NgModule({
  imports: [
    CommonModule,
    CabinetRoutes,
    SwiperModule,
    TranslateModule,
    SvgModule,

    /* NG-ZORRO */
    NzMenuModule,
    NzDividerModule,
    NzIconModule,
    NzBreadCrumbModule,
  ],
  declarations: [CabinetComponent, CabinetMenuComponent, BreadcrumbComponent],
})
export class CabinetModule {}
