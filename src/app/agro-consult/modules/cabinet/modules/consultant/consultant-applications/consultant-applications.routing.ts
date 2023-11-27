import { Routes, RouterModule } from '@angular/router';
import { FilterResolver } from 'projects/agro-consult/src/app/shared/services/filter.resolver';
import { MyOrderApplicationResolver } from 'projects/agro-consult/src/app/shared/services/my-order-application.resolver';
import { ConsultantApplicationsComponent } from './consultant-applications.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultantApplicationsComponent,
    data: {
      bc: 'orders',
    },
  },
];

export const ConsultantApplicationsRoutes = RouterModule.forChild(routes);
