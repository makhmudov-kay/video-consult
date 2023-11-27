import { Routes, RouterModule } from '@angular/router';
import { ClientApplicationDetailComponent } from './client-application-detail.component';

const routes: Routes = [
  { path: '', component: ClientApplicationDetailComponent },
];

export const ClientApplicationDetailRoutes = RouterModule.forChild(routes);
