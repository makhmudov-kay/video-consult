import { Routes, RouterModule } from '@angular/router';
import { ConsultantComponent } from './consultant.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultantComponent,
    data: {
      bc: 'consultant',
    },
  },
];

export const ConsultantRoutes = RouterModule.forChild(routes);
