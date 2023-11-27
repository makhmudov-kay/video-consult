import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationDetailResponse } from 'projects/agro-consult/src/app/shared/models/application-detail.response';
import { ApplicationsService } from 'projects/agro-consult/src/app/shared/services/application.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'az-responses-detail',
  templateUrl: './responses-detail.component.html',
  styleUrls: ['./responses-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponsesDetailComponent {
  /**
   *
   */
  id?: string;

  /**
   *
   */
  application$!: Observable<ApplicationDetailResponse>;

  /**
   *
   * @param route
   * @param $application
   */
  constructor(
    private route: ActivatedRoute,
    private $application: ApplicationsService
  ) {
    this.id = this.route.snapshot.params['id'];
    if (this.id && Number.isFinite(+this.id)) {
      this.getApplicationById(this.id);
    }
  }

  /**
   *
   * @param id
   */
  private getApplicationById(id: string) {
    this.application$ = this.$application
      .getById(id)
      .pipe(map((result) => result.data));
  }
}
