import { Routes, RouterModule } from '@angular/router';
import { ResponsesDetailComponent } from './responses-detail.component';

const routes: Routes = [{ path: '', component: ResponsesDetailComponent }];

export const ResponsesDetailRoutes = RouterModule.forChild(routes);
