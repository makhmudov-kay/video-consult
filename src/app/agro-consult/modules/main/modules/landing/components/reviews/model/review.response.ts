import { Id } from 'ngx-az-core';
export interface ReviewResponse extends Id {
  created_at: Date;
  file: string;
  fullname: string;
  rating: number;
  status: boolean;
  text: string;
  updated_at: Date;
}
