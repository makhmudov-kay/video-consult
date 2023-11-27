import { Routes, RouterModule } from '@angular/router';
import { ConsultatntChatListResolver } from 'projects/agro-consult/src/app/shared/services/consultant-chat-list.resolver';
import { FilterResolver } from 'projects/agro-consult/src/app/shared/services/filter.resolver';
import { ConsultantChatComponent } from './consultant-chat.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultantChatComponent,
    data: {
      bc: 'chat.STATUS_DEFAULT',
    },
  },
];

export const ConsultantChatRoutes = RouterModule.forChild(routes);
