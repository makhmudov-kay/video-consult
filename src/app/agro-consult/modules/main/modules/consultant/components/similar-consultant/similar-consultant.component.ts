import { ResumeResponse } from 'projects/agro-consult/src/app/shared/models/resume.response';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { SimilarConsultantService } from './services/similar-consultant.service';

@Component({
  selector: 'az-similar-consultant',
  templateUrl: './similar-consultant.component.html',
  styleUrls: ['./similar-consultant.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimilarConsultantComponent implements OnInit {
  /**
   *
   */
  @Input()
  categoryId!: number;

  /**
   *
   */
  similarConsultant$!: Observable<ResumeResponse[]>;

  /**
   *
   * @param $similar
   */
  constructor(private $similar: SimilarConsultantService) {}

  /**
   *
   */
  private getSimilarConsultants() {
    this.similarConsultant$ = this.$similar
      .getSimilarConsultant(this.categoryId, 4)
      .pipe(map((result) => result.data));
  }

  /**
   *
   */
  ngOnInit() {
    if (this.categoryId) {
      this.getSimilarConsultants();
    }
  }
}
