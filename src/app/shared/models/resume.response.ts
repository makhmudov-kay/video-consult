import { Id } from 'ngx-az-core';

export interface ResumeResponse extends Id {
  profile_id: number;
  category: string;
  category_id: number;
  sub_category_id: number;
  applications_count: number;
  language: string[];
  about: string;
  files: string[];
  attached_files: AttachedDocFiles[];
  status: number;
  created_at: Date;
  updated_at: Date;
  visible: boolean;
  skill_ids: number[];
  skills: string[];
  review: { count: number; rating: number };
  position: string;
  reason_inactive: string;
  user: {
    avatar: string;
    fullname: string;
    is_online: boolean;
    last_online_at: Date;
  };
  reviews?: any;
}

export interface AttachedDocFiles extends Id {
  created_at: Date;
  file: string;
  name: string;
  resume_id: number;
  type: string;
  updated_at: Date;
}
