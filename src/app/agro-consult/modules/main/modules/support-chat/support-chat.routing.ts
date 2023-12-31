import { Routes, RouterModule } from '@angular/router';
import { SupportChatComponent } from './support-chat.component';

const routes: Routes = [
  {
    path: '',
    component: SupportChatComponent,
    data: {
      bc: 'support',
    },
  },
];

export const SupportChatRoutes = RouterModule.forChild(routes);
