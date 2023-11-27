export interface ApplicationVisibleRequest {
  is_visible?: boolean;
  status?: number;
  chat_id?: string | number;
  to_profile_id?: number;
}
