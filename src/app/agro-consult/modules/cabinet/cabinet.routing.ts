import { Routes, RouterModule } from '@angular/router';
import { CabinetComponent } from './cabinet.component';

const routes: Routes = [
  {
    path: '',
    component: CabinetComponent,
    children: [
      { path: '', redirectTo: 'client', pathMatch: 'full' },
      {
        path: 'client',
        loadChildren: () =>
          import('./modules/client/client.module').then((m) => m.ClientModule),
      },
      {
        path: 'consultant',
        loadChildren: () =>
          import('./modules/consultant/consultant.module').then(
            (m) => m.ConsultantModule
          ),
      },
    ],
  },
];

export const CabinetRoutes = RouterModule.forChild(routes);
