import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { UtmGuard } from 'ngx-az-core';
import { GENERAL_ROUTES, LanguageGuard } from 'ngx-az-core';

const routes: Routes = [
  GENERAL_ROUTES.routeToFakeLanguage,
  {
    path: ':language',
    loadChildren: () =>
      import('./agro-consult/agro-consult.module').then(
        (m) => m.AgroConsultModule
      ),
    canActivate: [
      (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
        inject(LanguageGuard).canActivate(route, state),
      UtmGuard,
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
