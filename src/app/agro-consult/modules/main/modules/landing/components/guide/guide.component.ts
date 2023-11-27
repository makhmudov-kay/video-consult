import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'az-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuideComponent {}
