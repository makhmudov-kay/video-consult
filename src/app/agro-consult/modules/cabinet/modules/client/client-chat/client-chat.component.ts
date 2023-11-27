import { HttpParams } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChatItemResponse } from 'projects/agro-consult/src/app/shared/models/chat-item.response';
import { MyApplicationsResponse } from 'projects/agro-consult/src/app/shared/models/my-application.response';
import { RadioGroup } from 'projects/agro-consult/src/app/shared/radio-group/models/radio-group.model';
import { ClientChatListService } from 'projects/agro-consult/src/app/shared/services/client-chat-list.service';
import { MyApplicationService } from 'projects/agro-consult/src/app/shared/services/my-application.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'az-client-chat',
  templateUrl: './client-chat.component.html',
  styleUrls: ['./client-chat.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientChatComponent implements OnInit {
  /**
   *
   */
  clientApplicationRadioOptions: RadioGroup[] = [
    { value: 0, label: 'all', count: 0 },
    { value: 2, label: 'waitingToDo', count: 0 },
  ];

  /**
   *
   */
  clientChatList$!: Observable<ChatItemResponse[]>;

  /**
   *
   */
  applicationsList$!: Observable<MyApplicationsResponse[]>;

  /**
   *
   */
  form!: FormGroup;

  /**
   *
   */
  visible = false;

  /**
   *
   */
  selectedApp = '';

  /**
   *
   * @param $clientChatList
   * @param fb
   */
  constructor(
    private $clientChatList: ClientChatListService,
    private fb: FormBuilder,
    private $myApplication: MyApplicationService,
    private cd: ChangeDetectorRef
  ) {}

  /**
   *
   */
  private initForm() {
    this.form = this.fb.group({
      status: [0],
      application_id: [null],
    });
  }

  /**
   *
   */
  private getClientChatList(params?: HttpParams) {
    this.clientChatList$ = this.$clientChatList
      .getChatList(params)
      .pipe(map((result) => result.data));
  }

  /**
   *
   */
  private getApplicationsList() {
    this.applicationsList$ = this.$myApplication
      .get()
      .pipe(map((result) => result.data));
    this.cd.markForCheck();
  }

  /**
   *
   */
  ngOnInit() {
    this.initForm();
    this.getClientChatList();
    this.getApplicationsList();
  }

  /**
   *
   * @param applicationId
   */
  handleApplicationChange(applicationId: number) {
    const params = new HttpParams().append(
      'application_id',
      applicationId ? applicationId : ''
    );
    this.getClientChatList(params);
  }

  /**
   *
   * @param status
   */
  filterByStatus(status: number) {
    const params = new HttpParams().append('status', status);
    this.getClientChatList(params);
  }

  /**
   *
   * @param text
   */
  searchText(text: string) {
    const params = new HttpParams().append('search', text);
    this.getClientChatList(params);
  }

  /**
   *
   */
  open() {
    this.visible = true;
  }

  /**
   *
   */
  close(visible: boolean) {
    this.visible = visible;
  }
}
