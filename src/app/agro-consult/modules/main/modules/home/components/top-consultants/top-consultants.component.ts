import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'az-top-consultants',
  templateUrl: './top-consultants.component.html',
  styleUrls: ['./top-consultants.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopConsultantsComponent {
  categoryList = [].constructor(4);
}
