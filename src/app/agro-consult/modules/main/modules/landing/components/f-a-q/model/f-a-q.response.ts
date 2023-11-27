import { Id } from 'ngx-az-core';

export interface FAQResponse extends Id {
  content: string;
  created_at: Date;
  name: string;
}
