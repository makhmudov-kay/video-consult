import {
  Routes,
  RouterModule,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthGuard } from 'ngx-az-core';
import { AgroConsultConstants } from '../../../core/constants/agro-consult.constants';
import { MainComponent } from './main.component';
import { inject } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: {
      bc: 'main',
    },
    children: [
      {
        path: '',
        redirectTo: AgroConsultConstants.ROUTE_PATH_HOME,
        pathMatch: 'full',
      },
      {
        path: AgroConsultConstants.ROUTE_PATH_HOME,
        loadChildren: () =>
          import('./modules/landing/landing.module').then(
            (m) => m.LandingModule
          ),
      },
      {
        path: 'find-consultant',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },

      {
        path: 'consultant/:id',
        loadChildren: () =>
          import('./modules/consultant/consultant.module').then(
            (m) => m.ConsultantModule
          ),
      },
      {
        path: 'create-application',
        canActivate: [
          (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
            inject(AuthGuard).canActivate(route, state),
        ],
        loadChildren: () =>
          import('./modules/create-application/create-application.module').then(
            (m) => m.CreateApplicationModule
          ),
      },
      {
        path: 'application-type',
        canActivate: [
          (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
            inject(AuthGuard).canActivate(route, state),
        ],
        loadChildren: () =>
          import('./modules/application-type/application-type.module').then(
            (m) => m.ApplicationTypeModule
          ),
      },
      {
        path: 'support',
        canActivate: [
          (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
            inject(AuthGuard).canActivate(route, state),
        ],
        loadChildren: () =>
          import('./modules/support-chat/support-chat.module').then(
            (m) => m.SupportChatModule
          ),
      },
      {
        path: 'become-consultant',
        canActivate: [
          (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
            inject(AuthGuard).canActivate(route, state),
        ],
        loadChildren: () =>
          import('./modules/become-consultant/become-consultant.module').then(
            (m) => m.BecomeConsultantModule
          ),
      },
    ],
  },
];

export const MainRoutes = RouterModule.forChild(routes);
