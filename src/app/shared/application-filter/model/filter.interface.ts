export interface ApplicationFilter {
  category_id: number;
  price_from: number;
  price_to: number;
  when_date: boolean;
  type: string;
  search: string;
  response_status: boolean;
  status: number;
  private_expired: boolean;
  is_free: boolean;
}
