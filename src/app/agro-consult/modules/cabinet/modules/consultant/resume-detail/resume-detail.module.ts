import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeDetailComponent } from './resume-detail.component';
import { ResumeDetailRoutes } from './resume-detail.routing';
import { ResumeViewModule } from 'projects/agro-consult/src/app/shared/resume-view/resume-view.module';

@NgModule({
  imports: [CommonModule, ResumeDetailRoutes, ResumeViewModule],
  declarations: [ResumeDetailComponent],
})
export class ResumeDetailModule {}
