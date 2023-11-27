import { Routes, RouterModule } from '@angular/router';
import { ResumeComponent } from './resume.component';

const routes: Routes = [
  {
    path: '',
    component: ResumeComponent,
    data: {
      bc: 'myResumes',
    },
  },
];

export const ResumeRoutes = RouterModule.forChild(routes);
