import { HttpParams } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgDestroy } from 'ngx-az-core';
import { takeUntil, filter } from 'rxjs';
import { FilterCount } from '../models/filter-count.interface';
import { ResumeResponse } from '../models/resume.response';
import { RadioGroup } from '../radio-group/models/radio-group.model';
import { MyApplicationService } from '../services/my-application.service';
import { ApplicationFilter } from './model/filter.interface';

@Component({
  selector: 'az-application-filter',
  templateUrl: './application-filter.component.html',
  styleUrls: ['./application-filter.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationFilterComponent implements OnInit {
  /**
   *
   */
  @Input()
  isDrawer = false;

  /**
   *
   */
  @Input()
  isMyApplication!: boolean;

  /**
   *
   */
  @Input()
  myOrderApplication!: RadioGroup[];

  /**
   *
   */
  @Input()
  categoryList!: ResumeResponse[];

  /**
   *
   */
  @Output()
  filterParams = new EventEmitter<ApplicationFilter>();

  /**
   *
   */
  @Input()
  form!: FormGroup;

  /**
   *
   */
  @Input()
  filterCount!: FilterCount;

  /**
   *
   */
  @Output()
  categoryId = new EventEmitter<number | undefined>();

  /**
   *
   */
  @Output()
  closeDrawer = new EventEmitter();

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
  ngOnInit() {
    this.handleFilterCategoryList();
  }

  /**
   *
   */
  submit() {
    const request = this.form.getRawValue();
    request.type = request.type ? 'private' : '';
    request.response_status = request.response_status ? 1 : null;

    if (request.status && request.status !== 2 && request.status !== 4) {
      request.private_expired = true;
    }

    this.filterParams.emit(request);
  }

  /**
   *
   */
  resetForm() {
    this.form.reset();
    const request = this.form.getRawValue();
    this.filterParams.emit(request);
  }

  /**
   *
   * @param categoryId
   */
  setCountFilter(categoryId: number | null) {
    if (categoryId) {
      this.categoryId.emit(categoryId);
    } else {
      this.categoryId.emit();
    }
  }
}
