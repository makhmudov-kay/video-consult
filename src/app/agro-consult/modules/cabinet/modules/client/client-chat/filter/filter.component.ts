import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyApplicationsResponse } from 'projects/agro-consult/src/app/shared/models/my-application.response';
import { RadioGroup } from 'projects/agro-consult/src/app/shared/radio-group/models/radio-group.model';

@Component({
  selector: 'az-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  /**
   *
   */
  @Input()
  applicationsList!: MyApplicationsResponse[];

  /**
   *
   */
  @Input()
  selectedApp!: string | null;

  /**
   *
   */
  @Input()
  form!: FormGroup;

  /**
   *
   */
  @Input()
  clientApplicationRadioOptions!: RadioGroup[];

  /**
   *
   */
  @Output()
  applicationId = new EventEmitter<number>();

  /**
   *
   */
  @Output()
  statusId = new EventEmitter<number>();

  /**
   *
   * @param id
   */
  handleApplicationChange(id: number) {
    this.applicationId.emit(id);
  }

  /**
   *
   * @param status
   */
  filterByStatus(status: number) {
    this.statusId.emit(status);
  }

  /**
   * 
   */
  reset() {
    this.statusId.emit(0);
    this.selectedApp = null
    this.form.controls['status'].setValue(0)
  }
}
