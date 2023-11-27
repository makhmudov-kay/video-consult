import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantSearchComponent } from './consultant-search.component';
import { ConsultantSearchRoutes } from './consultant-search.routing';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SearchInputModule } from 'projects/agro-consult/src/app/shared/search-input/search-input.module';
import { ApplicationCardListModule } from 'projects/agro-consult/src/app/shared/application-card-list/application-card.module';
import { ApplicationFilterModule } from 'projects/agro-consult/src/app/shared/application-filter/application-filter.module';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { EmptyApplicationModule } from 'projects/agro-consult/src/app/shared/empty-application/empty-application.module';
import { DrawerModule } from 'projects/agro-consult/src/app/shared/drawer/drawer.module';

@NgModule({
  imports: [
    CommonModule,
    ConsultantSearchRoutes,
    FormsModule,
    SearchInputModule,
    ApplicationCardListModule,
    ApplicationFilterModule,
    EmptyApplicationModule,
    DrawerModule,

    /* NG-ZORRO */
    NzAvatarModule,
    NzDrawerModule,
    NzTypographyModule,
    NzInputModule,
    NzIconModule,
    NzEmptyModule,
    NzSkeletonModule,
  ],
  declarations: [ConsultantSearchComponent],
})
export class ConsultantSearchModule {}
