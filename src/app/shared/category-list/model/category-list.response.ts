import { Id } from 'ngx-az-core';

export interface CategoryListResponse extends Id {
  name: string;
  parent_id: number;
  created_at: string;
  updated_at: string;
  icon: string;
  file: string;
}
