import { Id } from 'ngx-az-core';

export interface SkillsByCategoryIdResponse extends Id {
  name: string;
  category_id: number;
  is_main: boolean;
  created_at: Date;
  updated_at: Date;
  category: string;
}
