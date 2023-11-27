import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationTypeComponent } from './application-type.component';
import { ApplicationTypeRoutes } from './application-type.routing';

@NgModule({
  imports: [CommonModule, ApplicationTypeRoutes, NzDividerModule],
  declarations: [ApplicationTypeComponent],
})

export class ApplicationTypeModule {}
