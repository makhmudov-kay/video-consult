import {
  Routes,
  RouterModule,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthGuard, GENERAL_ROUTES } from 'ngx-az-core';
import { AgroConsultConstants } from '../core/constants/agro-consult.constants';
import { AgroConsultComponent } from './agro-consult.component';
import { inject } from '@angular/core';
import { OAuthTokenGuard } from 'projects/agro-pay/src/app/agro-pay/oauth-token.guard';
import { SEOResolverFn } from 'ngx-az-core';

const routes: Routes = [
  {
    path: '',
    component: AgroConsultComponent,
    children: [
      {
        path: '',
        redirectTo: AgroConsultConstants.ROUTE_PATH_MAIN,
        pathMatch: 'full',
      },
      {
        path: AgroConsultConstants.ROUTE_PATH_MAIN,
        loadChildren: () =>
          import('./modules/main/main.module').then((m) => m.MainModule),
        canActivate: [OAuthTokenGuard],
        resolve: [SEOResolverFn],
        data: {
          meta: {
            title: 'agromaslahat.home.title',
            description: 'agromaslahat.home.description',
          },
        },
      },
      {
        path: AgroConsultConstants.ROUTE_PATH_CABINET,
        canActivate: [
          (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
            inject(AuthGuard).canActivate(route, state),
        ],
        loadChildren: () =>
          import('./modules/cabinet/cabinet.module').then(
            (m) => m.CabinetModule
          ),
      },
      GENERAL_ROUTES.routeTo404Component,
    ],
  },
  {
    path: 'landing',
    loadComponent: () =>
      import('./modules/landing/landing.component').then(
        (m) => m.LandingComponent
      ),
  },
  {
    path: 'landing/:consultantType',
    loadComponent: () =>
      import('./modules/landing/landing.component').then(
        (m) => m.LandingComponent
      ),
  },
  GENERAL_ROUTES.routeToSignIn,
  GENERAL_ROUTES.routeTo500Page,
  GENERAL_ROUTES.routeToWildcard,
];

export const AgroConsultRoutes = RouterModule.forChild(routes);
