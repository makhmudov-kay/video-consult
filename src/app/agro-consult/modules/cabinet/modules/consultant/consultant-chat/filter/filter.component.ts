import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResumeResponse } from 'projects/agro-consult/src/app/shared/models/resume.response';
import { RadioGroup } from 'projects/agro-consult/src/app/shared/radio-group/models/radio-group.model';

@Component({
  selector: 'az-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  /**
   *
   */
  @Input()
  form!: FormGroup;

  /**
   *
   */
  @Input()
  categoryNull!: null;

  /**
   *
   */
  @Input()
  categoryList!: ResumeResponse[];

  /**
   *
   */
  @Input()
  clientApplicationRadioOptions!: RadioGroup[];

  /**
   *
   */
  @Output()
  resetInputs = new EventEmitter();

  /**
   *
   */
  @Output()
  changeStatus = new EventEmitter<number | null>();

  /**
   *
   */
  @Output()
  changeResume = new EventEmitter<number | null>();

  /**
   *
   */
  filteredCategoryList: ResumeResponse[] = [];

  /**
   *
   */
  private handleFilterCategoryList() {
    const filteredCategoryList = this.categoryList.filter(
      (c) => c.status === 2
    );

    filteredCategoryList.forEach((r) => {
      const cat = this.filteredCategoryList.find(
        (c) => c.category_id === r.category_id
      );
      if (!cat) {
        this.filteredCategoryList.push(r);
      }
    });
  }

  /**
   *
   */
  ngOnInit(): void {
    this.handleFilterCategoryList();
  }

  /**
   *
   */
  reset() {
    this.resetInputs.emit();
    
  }

  /**
   *
   * @param status
   */
  filterByStatus(status: number | null) {
    this.changeStatus.emit(status);
  }

  /**
   *
   * @param categoryId
   */
  filterByCategory(categoryId: number | null) { 
    this.changeResume.emit(categoryId);
  }
}
