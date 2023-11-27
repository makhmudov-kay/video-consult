import { Id } from 'ngx-az-core';

export interface MyApplicationsResponse extends Id {
  category: string;
  category_id: number;
  created_at: string;
  description: string;
  files: string[];
  price_from: string;
  price_to: string;
  profile_id: number;
  reason_inactive: string;
  response: ApplicationResponse[];
  response_count: number;
  showed: false;
  status: number;
  title: string;
  type: string;
  user: string;
  views: number;
  when_date: string;
  is_visible: boolean;
}

interface ApplicationResponse extends Id {
  amount: string;
  application_id: number;
  category: string;
  created_at: string;
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
