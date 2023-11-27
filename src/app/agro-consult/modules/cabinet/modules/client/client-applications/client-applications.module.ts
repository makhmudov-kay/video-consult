import { TranslateModule } from '@ngx-translate/core';
import { ApplicationTypeModalModule } from './../../../../main/modules/shared/application-type-modal/application-type-modal.module';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientApplicationsComponent } from './client-applications.component';
import { ClientApplicationsRoutes } from './client-applications.routing';
import { SearchInputModule } from 'projects/agro-consult/src/app/shared/search-input/search-input.module';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { ClientApplicationCardModule } from 'projects/agro-consult/src/app/shared/client-application-card/client-application-card.module';
import { RadioGroupModule } from 'projects/agro-consult/src/app/shared/radio-group/radio-group.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EmptyApplicationModule } from 'projects/agro-consult/src/app/shared/empty-application/empty-application.module';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@NgModule({
  imports: [
    CommonModule,
    ClientApplicationsRoutes,
    SearchInputModule,
    FormsModule,
    ClientApplicationCardModule,
    RadioGroupModule,
    EmptyApplicationModule,
    ApplicationTypeModalModule,
    TranslateModule,

    /* NG-ZORRO */
    NzRadioModule,
    NzIconModule,
    NzSkeletonModule,
    NzBadgeModule
  ],
  declarations: [ClientApplicationsComponent],
})
export class ClientApplicationsModule {}
