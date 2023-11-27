import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MyApplicationsResponse } from '../models/my-application.response';

@Component({
  selector: 'az-client-application-card',
  templateUrl: './client-application-card.component.html',
  styleUrls: ['./client-application-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientApplicationCardComponent {
  /**
   *
   */
  @Input()
  isCabinet = false;

  /**
   *
   */
  @Input()
  cardInfo!: MyApplicationsResponse;

  /**
   *
   */
  @Input()
  status!: number;
}
