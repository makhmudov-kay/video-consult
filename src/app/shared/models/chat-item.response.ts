import { Id } from 'ngx-az-core';

export interface ChatItemResponse extends Id {
  application_id: number;
  profile_ids: number[];
  last_time: Date;
  to_profile_id: number;
  unread_count: number;
  profile: {
    fullname: string;
    avatar: string;
    position: string;
  };
  application: {
    id: number;
    title: string;
    profile_id: number;
    category_id: number;
    user: string;
    category: string;
    response_count: number;
  };
  messages: {
    id: number;
    chat_id: number;
    from_profile_id: number;
    message: string;
    is_showed: boolean;
    showed_at: Date;
    created_at: Date;
    updated_at: Date;
    owner: boolean;
    type: string;
  };
}
