import { Routes, RouterModule } from '@angular/router';
import { ResumeDetailComponent } from './resume-detail.component';

const routes: Routes = [{ path: '', component: ResumeDetailComponent }];

export const ResumeDetailRoutes = RouterModule.forChild(routes);
