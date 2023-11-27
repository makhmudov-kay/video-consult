export interface ResumeRequest {
  category_id: number;
  language: string[];
  about: string;
  files: File[];
  skill_ids: number[];
}
