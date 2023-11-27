import { Id } from 'ngx-az-core';

export interface Application extends Id {
  application_id: number;
  profile_ids: number[];
  last_time: Date;
  to_profile_id: number;
  unread_count: number;
  profile: ProfileInfo;
  application: {
    id: number;
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
    expired_date: string;
    price_from: string;
    price_to: string;
    when: Date;
    when_date: string;
    title: string;
    payment_verified: boolean;
    showed: boolean;
    reason_inactive: string;
    user: {
      fullname: string;
      avatar: string;
      last_online_at: Date;
    };
    category: string;
    response_count: number;
    response_status: number;
  };
}

export interface ProfileInfo {
  fullname: string;
  avatar: string;
  profile_id: number;
  id: number;
  is_online: boolean;
  resume_id: number;
}
