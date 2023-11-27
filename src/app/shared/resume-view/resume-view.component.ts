import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'ngx-az-core';
import { ResumeResponse } from '../models/resume.response';

@Component({
  selector: 'az-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeViewComponent {
  /**
   *
   */
  @Input()
  data!: ResumeResponse;

  /**
   *
   * @param router
   * @param $store
   */
  constructor(private router: Router, private $storeService: StoreService) {}

  /**
   *
   * @param id
   */
  navigateTo(id: number) {
    this.router.navigate([
      this.$storeService.currentLanguage,
      'main',
      'become-consultant',
      'resume',
      id,
    ]);
  }
}
