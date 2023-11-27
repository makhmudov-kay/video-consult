import { Id } from 'ngx-az-core';

export interface HistoryTransaction extends Id {
  amount: number;
  application_id: number;
  created_at: Date;
  profile_id: number;
  profile: ProfileInfoByTranasction;
  status: number;
  title: string;
  to_profile: ProfileInfoByTranasction;
  to_profile_id: number;
  updated_at: Date;
  detail: PaymentDetails;
  transaction_id: number;
}

export interface ProfileInfoByTranasction extends Id {
  created_at: Date;
  guide_consultant: boolean;
  guide_user: boolean;
  is_active: boolean;
  is_consultant: boolean;
  is_stream: boolean;
  last_online_at: Date;
  role: string;
  user: User;
  updated_at: Date;
  user_id: number;
}

export interface User extends Id {
  email: string;
  f_name: string;
  l_name: string;
  login: string;
  phone: number;
  photo: string;
  s_name: string;
}

export interface PaymentDetails {
  amount: string;
  amount_credit: string;
  card: string;
  commission: string;
  expiry: string;
  order_id: string;
  project_id: string;
  receiver: string;
  receiver_secure_card: string;
  sender_secure_card: string;
}
