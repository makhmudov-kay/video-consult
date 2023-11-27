import { PaginationModule } from 'projects/agro-consult/src/app/shared/pagination/pagination.module';
import { ConsultantCardModule } from 'projects/agro-consult/src/app/shared/consultant-card/consultant-card.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantListComponent } from './consultant-list.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ConsultantCardModule,
    PaginationModule,
    FormsModule,
    TranslateModule,
    /* **** */
    NzGridModule,
    NzSelectModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
  ],
  declarations: [ConsultantListComponent],
  exports: [ConsultantListComponent],
})
export class ConsultantListModule {}
