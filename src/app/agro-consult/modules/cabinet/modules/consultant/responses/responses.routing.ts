import { Routes, RouterModule } from '@angular/router';
import { FilterResolver } from 'projects/agro-consult/src/app/shared/services/filter.resolver';
import { MyResponsesResolver } from 'projects/agro-consult/src/app/shared/services/my-response.resolver';
import { ResponsesComponent } from './responses.component';

const routes: Routes = [
  {
    path: '',
    component: ResponsesComponent,
    data: {
      bc: 'myResponses',
    },
    resolve: { filter: FilterResolver, data: MyResponsesResolver },
  },
];

export const ResponsesRoutes = RouterModule.forChild(routes);
