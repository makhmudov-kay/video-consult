import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FAQService } from '../service/f-a-q.service';
import { FAQResponse } from '../components/f-a-q/model/f-a-q.response';

@Injectable({ providedIn: 'root' })
export class FAQResolver {
  /**
   *
   * @param $faqService
   */
  constructor(private $faqService: FAQService) {}

  /**
   *
   * @param route
   * @returns
   */
  resolve():
    | Observable<FAQResponse[]>
    | Promise<FAQResponse[]>
    | FAQResponse[] {
    return this.$faqService.getFAQ().pipe(map((result) => result.data));
  }
}
