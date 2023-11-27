export interface Offer {
  chat_id: string;
  msg: Message[];
}

interface Message {
  message: string;
  is_price: boolean;
  file?: File;
  action_status?: number
}
