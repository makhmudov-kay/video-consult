export interface ApplicationRequest {
  resume_id: string;
  title: string;
  category_id: number;
  description: string;
  when_date: Date | string | null;
  price_from: number;
  price_to: number;
  files: File[];
}
