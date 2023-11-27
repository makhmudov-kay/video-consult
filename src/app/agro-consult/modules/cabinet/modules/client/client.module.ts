import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgModule } from 'projects/agro-consult/src/app/shared/svg/svg.module';
import { ClientComponent } from './client.component';
import { ClientRoutes } from './client.routing';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  imports: [CommonModule, ClientRoutes, SvgModule, TranslateModule],
  declarations: [ClientComponent, MenuComponent],
})
export class ClientModule {}
