import { Routes, RouterModule } from '@angular/router';
import { ChooseTypeApplicationComponent } from './choose-type-application.component';

const routes: Routes = [
  {
    path: '',
    component: ChooseTypeApplicationComponent,
    data: {
      bc: 'createApplication'
    },
  },
];

export const ChooseTypeApplicationRoutes = RouterModule.forChild(routes);
