import { CategorySelectResponse } from "projects/agro-consult/src/app/shared/models/category-select.response";
import { SkillsByCategoryIdResponse } from "projects/agro-consult/src/app/shared/models/skills-by-category.response";

export interface SelectedValue {
    category: CategorySelectResponse;
    skills?: SkillsByCategoryIdResponse[];
  }