import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'az-step-header',
  templateUrl: './step-header.component.html',
  styleUrls: ['./step-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepHeaderComponent {
  /**
   *
   */
  @Input()
  step!: number;

  /**
   *
   */
  @Input()
  title!: string;

  /**
   *
   */
  @Input()
  description!: string;

  /**
   *
   */
  maxSteps = 5;
}
