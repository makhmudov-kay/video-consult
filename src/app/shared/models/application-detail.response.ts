import { Id } from 'ngx-az-core';
import { UserInfo } from './search-application.interface';

export interface ApplicationDetailResponse extends Id {
  resume_id: number;
  profile_id: number;
  category_id: number;
  description: string;
  status: number;
  files: string[];
  deleted_at: Date;
  created_at: Date;
  updated_at: Date;
  views: number;
  type: string;
  is_free: boolean;
  is_visible: boolean;
  expired_date: Date;
  price_from: string;
  price_to: string;
  when: Date;
  when_date: Date;
  title: string;
  payment_verified: boolean;
  showed: boolean;
  reason_inactive: string;
  user: UserInfo;
  category: string;
  response_count: number;
  response: ResponseCard[];
  chat: ChatItem[];
}

interface ChatItem extends Id {
  application_id: number;
  last_time: Date;
  profile: {
    avatar: string;
    fullname: string;
    id: number;
    is_online: boolean;
    profile_id: number;
  };
  profile_ids: number[];
  to_profile_id: number;
  unread_count: number;
}

export interface ResponseCard extends Id {
  amount: string;
  chat_id: number;
  application_id: number;
  category: string;
  created_at: Date;
  is_showed: boolean;
  resume_id: number;
  status: number;
  text: string;
  updated_at: string;
  user: {
    avatar: string;
    fullname: string;
  };
}
