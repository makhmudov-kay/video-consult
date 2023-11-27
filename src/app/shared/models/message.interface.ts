import { Id } from 'ngx-az-core';
import { FileType } from '../chat-window/components/attach-files/attach-files.component';

export interface Message extends Id {
  chat_id: number;
  from_profile_id: number;
  message: string;
  is_showed: boolean;
  showed_at: Date;
  created_at: Date;
  updated_at: Date;
  is_price: boolean;
  owner: boolean;
  file?: string | null;
  fileType?: FileType;
  fileName?: string;
  file_original_name: string;
  action_status: number;
  call_duration?: number;
  call_status?: number;
  type: string;
}
