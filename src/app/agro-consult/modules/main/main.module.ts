import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutes } from './main.routing';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MainRoutes,
    TranslateModule,
    /* NG-ZORRO */
    NzBreadCrumbModule,
  ],
  declarations: [MainComponent, BreadcrumbComponent],
})
export class MainModule {}
