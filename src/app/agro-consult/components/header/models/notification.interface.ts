import { Id } from 'ngx-az-core';
import { PaymentDetails } from 'projects/agro-consult/src/app/shared/payment/model/history.response';

export interface Notification extends Id {
  created_at: Date;
  data: {
    status: string | number;
    reason_inactive: string;
    category: string;
    category_id: number;
    detail: PaymentDetails;
    order_id: string;
    sender_id: string;
    amount: string;
  };
  count: number;
  description: string;
  link: number;
  profile_id: number;
  showed: boolean;
  text: string;
  type: string;
  updated_at: Date;
  is_consultant: boolean;
}
