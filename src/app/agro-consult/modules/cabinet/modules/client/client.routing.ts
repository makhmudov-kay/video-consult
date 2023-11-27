import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    data: {
      bc: 'cabinet.client',
    },
    children: [
      { path: '', redirectTo: 'applications', pathMatch: 'full' },
      {
        path: 'applications',
        loadChildren: () =>
          import('./client-applications/client-applications.module').then(
            (m) => m.ClientApplicationsModule
          ),
      },
      {
        path: 'applications/:id',
        loadChildren: () =>
          import(
            './client-application-detail/client-application-detail.module'
          ).then((m) => m.ClientApplicationDetailModule),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./client-chat/client-chat.module').then(
            (m) => m.ClientChatModule
          ),
      },
      {
        path: 'chat/:id',
        loadChildren: () =>
          import('./chat-window/chat-window.module').then(
            (m) => m.ChatWindowModule
          ),
      },
      {
        path: 'payment',
        loadChildren: () =>
          import('./client-payment/client-payment.module').then(
            (m) => m.ClientPaymentModule
          ),
      },
    ],
  },
];

export const ClientRoutes = RouterModule.forChild(routes);
