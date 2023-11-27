import { MyResumeService } from 'projects/agro-consult/src/app/shared/services/my-resume.service';
import { HttpParams } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChatItemResponse } from 'projects/agro-consult/src/app/shared/models/chat-item.response';
import { ResumeResponse } from 'projects/agro-consult/src/app/shared/models/resume.response';
import { RadioGroup } from 'projects/agro-consult/src/app/shared/radio-group/models/radio-group.model';
import { ConsultantChatListService } from 'projects/agro-consult/src/app/shared/services/consultant-chat-list.service';
import { map, Observable, takeUntil } from 'rxjs';
import { LanguageState, NgDestroy } from 'ngx-az-core';
import { Select } from '@ngxs/store';

@Component({
  selector: 'az-consultant-chat',
  templateUrl: './consultant-chat.component.html',
  styleUrls: ['./consultant-chat.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultantChatComponent {
  /**
   *
   */
  clientApplicationRadioOptions: RadioGroup[] = [
    { value: null, label: 'all', count: 0 },
    { value: 2, label: 'waitingToDo', count: 0 },
    { value: 1, label: 'privateApplications', count: 0 },
    { value: 3, label: 'canceled', count: 0 },
  ];

  /**
   *
   */
  form!: FormGroup;

  /**
   *
   */
  categoryList!: ResumeResponse[];

  /**
   *
   */
  visible = false;

  /**
   *
   */
  categoryNull = null;

  /**
   *
   */
  consultantChatList!: ChatItemResponse[];

  /**
   *
   */
  categoryList$!: Observable<ResumeResponse[]>;

  /**
   *
   */
  @Select(LanguageState.currentLanguage)
  language$!: Observable<string>;

  /**
   *
   * @param cd
   * @param fb
   * @param $chatList
   * @param $myResume
   */
  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private $chatList: ConsultantChatListService,
    private $myResume: MyResumeService,
    private $destroy: NgDestroy
  ) {
    this.language$.pipe(takeUntil(this.$destroy)).subscribe(() => {
      this.getResumeList();
    });
  }

  /**
   *
   */
  private initForm() {
    this.form = this.fb.group({
      category_id: [null],
      status: [null],
    });
  }

  /**
   *
   * @param params
   */
  private getChatList(params?: HttpParams) {
    this.$chatList
      .getConsultantChatList(params)
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        this.consultantChatList = result.data;
        this.cd.markForCheck();
      });
  }

  /**
   *
   */
  private getResumeList() {
    this.categoryList$ = this.$myResume
      .getMyResumeList()
      .pipe(map((result) => result.data));
  }

  /**
   *
   */
  ngOnInit() {
    this.getChatList();
    this.initForm();
  }

  /**
   *
   * @param isVisible
   */
  close(isVisible: boolean) {
    this.visible = isVisible;
  }

  /**
   *
   */
  reset() {
    this.form.reset();
    this.getChatList();
  }

  /**
   *
   * @param text
   */
  searchText(text: string) {
    if (text) {
      const search = new HttpParams().append('search', text);
      this.getChatList(search);
    } else {
      this.getChatList();
    }
  }

  /**
   *
   * @param status
   */
  filterByStatus(status: number | null) {
    let params;
    switch (status) {
      case null:
        console.log('status');
        this.getChatList();
        break;
      case 1:
        params = new HttpParams().append('type', 'private');
        this.getChatList(params);
        break;
      case 2:
        console.log('status 2');
        params = new HttpParams().append('status', 2);
        this.getChatList(params);
        break;
      case 3:
        console.log('status 3');
        params = new HttpParams().append('response_status', 3);
        this.getChatList(params);
        break;

      default:
        break;
    }
  }

  /**
   *
   * @param categoryId
   */
  filterByCategory(categoryId: number | null) {
    if (categoryId) {
      const params = new HttpParams().append('category_id', categoryId);
      this.getChatList(params);
    } else {
      console.log('category_id null');
      this.getChatList();
    }
  }

  /**
   *
   */
  open() {
    this.visible = true;
  }
}
