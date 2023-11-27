import { Routes, RouterModule } from '@angular/router';
import { ConsultantApplicationDetailComponent } from './consultant-application-detail.component';

const routes: Routes = [
  { path: '', component: ConsultantApplicationDetailComponent },
];

export const ConsultantApplicationDetailRoutes = RouterModule.forChild(routes);
