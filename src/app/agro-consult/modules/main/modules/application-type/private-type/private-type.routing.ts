import { Routes, RouterModule } from '@angular/router';
import { PrivateTypeComponent } from './private-type.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateTypeComponent,
    data: {
      bc: 'createApplication',
    },
  },
];

export const PrivateTypeRoutes = RouterModule.forChild(routes);
