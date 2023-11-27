import { inject } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuideResolver } from './components/useability-guide-modal/service/guide.resolver';
import { LandingComponent } from './landing.component';
import { FAQResolver } from './resolver/f-a-q.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: ':type',
    component: LandingComponent,
    resolve: {
      data: () => inject(FAQResolver).resolve(),
      guide: GuideResolver,
    },
  },
];

export const LandingRoutes = RouterModule.forChild(routes);
