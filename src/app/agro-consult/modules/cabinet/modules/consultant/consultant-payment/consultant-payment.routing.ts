import { Routes, RouterModule } from '@angular/router';
import { ConsultantPaymentComponent } from './consultant-payment.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultantPaymentComponent,
    data: {
      bc: 'paymentMethod',
    },
  },
];

export const ConsultantPaymentRoutes = RouterModule.forChild(routes);
