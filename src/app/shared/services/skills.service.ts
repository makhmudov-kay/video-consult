import { Injectable } from '@angular/core';
import { BaseService } from 'ngx-az-core';
import { HttpParams } from '@angular/common/http';
import { SkillsByCategoryIdResponse } from '../models/skills-by-category.response';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  /**
   *
   */
  url = 'skill-list';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   *
   * @returns
   */
  getAllByCategoryId(categoryId: number) {
    const param = new HttpParams().append('category_id', categoryId);
    return this.$baseService.get<SkillsByCategoryIdResponse[]>(
      `${this.url}`,
      param
    );
  }
}
