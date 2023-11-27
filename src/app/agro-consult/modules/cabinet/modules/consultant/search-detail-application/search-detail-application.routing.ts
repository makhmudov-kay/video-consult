import { Routes, RouterModule } from '@angular/router';
import { SearchDetailApplicationComponent } from './search-detail-application.component';

const routes: Routes = [
  { path: '', component: SearchDetailApplicationComponent },
];

export const SearchDetailApplicationRoutes = RouterModule.forChild(routes);
