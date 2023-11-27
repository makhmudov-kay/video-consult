import { Id } from 'ngx-az-core';

export interface GetInfo extends Id {
  email: string;
  f_name: string;
  l_name: string;
  login: string;
  phone: number;
  photo: string;
  s_name: string;
  profile: Profile;
}

interface Profile extends Id {
  created_at: Date;
  guide_consultant: boolean;
  guide_user: boolean;
  is_active: boolean;
  is_consultant: boolean;
  is_stream: boolean;
  last_online_at: Date;
  role: string;
  updated_at: Date;
  user_id: number;
}
