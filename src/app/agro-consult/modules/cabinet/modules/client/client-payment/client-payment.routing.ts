import { Routes, RouterModule } from '@angular/router';
import { ClientPaymentComponent } from './client-payment.component';

const routes: Routes = [
  {
    path: '',
    component: ClientPaymentComponent,
    data: {
      bc: 'paymentMethod',
    },
  },
];

export const ClientPaymentRoutes = RouterModule.forChild(routes);
