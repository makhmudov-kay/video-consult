import { Routes, RouterModule } from '@angular/router';
import { CategoryListResolver } from 'projects/agro-consult/src/app/shared/category-list/service/category-list.resolver';
import { CreateApplicationComponent } from './create-application.component';

const routes: Routes = [
  {
    path: '',
    component: CreateApplicationComponent,
    data: {
      bc: 'createApplication',
      hasConsultant: false,
    },
    resolve: { data: CategoryListResolver },
  },
  {
    path: ':consultantId',
    component: CreateApplicationComponent,
    data: {
      hasConsultant: true,
    },
    resolve: { data: CategoryListResolver },
  },
];

export const CreateApplicationRoutes = RouterModule.forChild(routes);
