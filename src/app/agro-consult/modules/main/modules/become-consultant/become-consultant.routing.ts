import { Routes, RouterModule } from '@angular/router';
import { BecomeConsultantComponent } from './become-consultant.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ResumePageComponent } from './components/resume-page/resume-page.component';
import { CategoryListResolver } from './components/specialization/resolver/category-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: BecomeConsultantComponent,
    data: {
      bc: 'becomeConsultant',
    },
    children: [
      { path: '', component: AboutPageComponent },
      {
        path: 'resume',
        component: ResumePageComponent,
        resolve: { category: CategoryListResolver },
      },
      { path: 'resume/:id', component: ResumePageComponent },
    ],
  },
];

export const BecomeConsultantRoutes = RouterModule.forChild(routes);
