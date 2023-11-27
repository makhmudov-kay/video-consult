import { Routes, RouterModule } from '@angular/router';
import { ApplicationTypeComponent } from './application-type.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationTypeComponent,
    children: [
      {
        path: '',
        redirectTo: 'types',
        pathMatch: 'full',
      },
      {
        path: 'types',
        loadChildren: () =>
          import(
            './choose-type-application/choose-type-application.module'
          ).then((m) => m.ChooseTypeApplicationModule),
      },
      {
        path: 'private',
        loadChildren: () =>
          import('./private-type/private-type.module').then(
            (m) => m.PrivateTypeModule
          ),
      },
    ],
  },
];

export const ApplicationTypeRoutes = RouterModule.forChild(routes);
