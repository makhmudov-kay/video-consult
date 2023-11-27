export interface WsMessage {
  chatMessage: {
    call_duration: any;
    type: string;
    call_status: number;
    action_status: number;
    file_original_name: string;
    chat_id: number;
    created_at: Date;
    from_profile_id: number;
    id: number;
    is_price: boolean;
    is_showed: boolean;
    message: string;
    owner: boolean;
    showed_at: Date;
    updated_at: Date;
    file: string;
  };
  to_profile_id: number;
}
