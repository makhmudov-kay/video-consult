export interface RespondRequest {
  application_id: number;
  resume_id: number;
  amount: number;
  text: string;
}

export interface RespondPrivateRequest {
  application_id: number;
  msg: Message[];
}

interface Message {
  message: string;
  is_price: boolean;
}
