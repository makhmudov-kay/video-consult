import { Routes, RouterModule } from '@angular/router';
import { ClientApplicationsComponent } from './client-applications.component';

const routes: Routes = [
  {
    path: '',
    component: ClientApplicationsComponent,
    data: {
      bc: 'myApplications',
    },
  },
];

export const ClientApplicationsRoutes = RouterModule.forChild(routes);
