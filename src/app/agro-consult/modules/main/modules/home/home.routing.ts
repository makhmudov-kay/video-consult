import { inject } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListResolver } from 'projects/agro-consult/src/app/shared/category-list/service/category-list.resolver';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: {data: () => inject(CategoryListResolver).resolve()} },
];

export const HomeRoutes = RouterModule.forChild(routes);
