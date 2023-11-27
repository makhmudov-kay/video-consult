import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from './drawer.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  imports: [
    CommonModule,
    NzDrawerModule,
    NzRadioModule,
    NzTypographyModule,
    NzSelectModule,
  ],
  declarations: [DrawerComponent],
  exports: [DrawerComponent],
})
export class DrawerModule {}
