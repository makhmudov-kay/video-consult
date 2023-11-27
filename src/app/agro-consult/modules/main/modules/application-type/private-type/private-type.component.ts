import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-private-type',
  templateUrl: './private-type.component.html',
  styleUrls: ['./private-type.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivateTypeComponent {}
