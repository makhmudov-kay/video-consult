import { Routes, RouterModule } from '@angular/router';
import { FilterResolver } from 'projects/agro-consult/src/app/shared/services/filter.resolver';
import { SearchApplicationResolver } from 'projects/agro-consult/src/app/shared/services/search-application.resolver';
import { ConsultantSearchComponent } from './consultant-search.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultantSearchComponent,
    data: {
      bc: 'applicationsSearch',
    },
  },
];

export const ConsultantSearchRoutes = RouterModule.forChild(routes);
