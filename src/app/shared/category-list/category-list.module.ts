import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SvgModule } from '../svg/svg.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    /* NG-ZORRO */
    NzGridModule,
    SvgModule,
  ],
  declarations: [CategoryListComponent],
  exports: [CategoryListComponent],
})
export class CategoryListModule {}
