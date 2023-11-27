import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@NgModule({
  imports: [CommonModule, NzPaginationModule],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
})
export class PaginationModule {}
