import { Routes, RouterModule } from '@angular/router';
import { ClientChatComponent } from './client-chat.component';

const routes: Routes = [
  {
    path: '',
    component: ClientChatComponent,
    data: {
      bc: 'chat.STATUS_DEFAULT',
    },
  },
];

export const ClientChatRoutes = RouterModule.forChild(routes);
