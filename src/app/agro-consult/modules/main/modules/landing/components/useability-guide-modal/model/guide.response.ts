import { Id } from 'ngx-az-core';

export interface GuideResponse extends Id {
  created_at: Date;
  description: string;
  position: number;
  title: string;
  type: string;
  updated_at: Date;
  videos: string;
}
