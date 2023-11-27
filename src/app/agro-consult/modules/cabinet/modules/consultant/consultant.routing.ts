import { Routes, RouterModule } from '@angular/router';
import { ConsultantComponent } from './consultant.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultantComponent,
    data: {
      bc: 'cabinet.consultant',
    },
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      {
        path: 'search',
        loadChildren: () =>
          import('./consultant-search/consultant-search.module').then(
            (m) => m.ConsultantSearchModule
          ),
      },
      {
        path: 'search/:id',
        loadChildren: () =>
          import(
            './search-detail-application/search-detail-application.module'
          ).then((m) => m.SearchDetailApplicationModule),
      },
      {
        path: 'applications',
        loadChildren: () =>
          import(
            './consultant-applications/consultant-applications.module'
          ).then((m) => m.ConsultantApplicationsModule),
      },
      {
        path: 'applications/:id',
        loadChildren: () =>
          import(
            './consultant-application-detail/consultant-application-detail.module'
          ).then((m) => m.ConsultantApplicationDetailModule),
      },
      {
        path: 'response',
        loadChildren: () =>
          import('./responses/responses.module').then((m) => m.ResponsesModule),
      },
      {
        path: 'response/:id',
        loadChildren: () =>
          import('./responses-detail/responses-detail.module').then(
            (m) => m.ResponsesDetailModule
          ),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./consultant-chat/consultant-chat.module').then(
            (m) => m.ConsultantChatModule
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
          import('./consultant-payment/consultant-payment.module').then(
            (m) => m.ConsultantPaymentModule
          ),
      },
      {
        path: 'resume',
        loadChildren: () =>
          import('./resume/resume.module').then((m) => m.ResumeModule),
      },
      {
        path: 'resume/:id',
        loadChildren: () =>
          import('./resume-detail/resume-detail.module').then(
            (m) => m.ResumeDetailModule
          ),
      },
    ],
  },
];

export const ConsultantRoutes = RouterModule.forChild(routes);
