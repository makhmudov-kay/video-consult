import { Id } from 'ngx-az-core';

export interface SearchApplicationResponse extends Id {
  category: string;
  category_id: number;
  created_at: Date;
  description: string;
  files: string[];
  is_visible: boolean;
  price_from: string;
  price_to: string;
  profile_id: number;
  reason_inactive: string;
  response_count: number;
  showed: boolean;
  status: number;
  title: string;
  type: string;
  user: UserInfo;
  views: number;
  when_date: Date;
  response_status?: number;
}

export interface UserInfo extends Id {
  fullname: string;
  avatar: string;
  last_online_at: Date;
  is_online: boolean;
}
