import { NzSafeAny } from 'ng-zorro-antd/core/types';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Offer } from '../../../models/offer.request';
import { Message } from '../../../models/message.interface';
import { ChatMessageService } from '../../../services/chat-message.service';
import { NgDestroy } from 'ngx-az-core';
import { takeUntil } from 'rxjs';

export type FileType = 'video' | 'img' | 'doc';

@Component({
  selector: 'az-attach-files-content',
  templateUrl: './attach-files.component.html',
  styleUrls: ['./attach-files.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachFilesComponent {
  /**
   *
   */
  @Input()
  id?: string;

  /**
   *
   */
  @Input()
  isVisibleAccept!: boolean;

  /**
   *
   */
  @Input()
  form!: FormGroup;

  /**
   *
   */
  @Output()
  closeModal = new EventEmitter();

  /**
   *
   */
  @Output()
  addMessage = new EventEmitter<Message>();

  /**
   *
   */
  type?: FileType;

  /**
   *
   */
  isLoading = false;

  /**
   *
   */
  file?: File | null;

  /**
   *
   */
  fileName?: string;

  /**
   *
   */
  fileSrc?: string | null;

  /**
   *
   */
  fileSize!: number;

  /**
   *
   */
  readonly limitImgSize = 10;

  /**
   * maximum video size 50mb
   */
  readonly limitVideoSize = 50;

  /**
   *
   */
  handleVideoAction = false;

  /**
   *
   */
  @ViewChild('inputImg')
  inputImg!: ElementRef;

  /**
   *
   */
  @ViewChild('inputVideo')
  inputVideo!: ElementRef;

  /**
   *
   */
  @ViewChild('inputFile')
  inputFile!: ElementRef;

  /**
   *
   */
  @ViewChild('screenVideo')
  screenVideo!: ElementRef;

  /**
   *
   */
  videoSizeLimit = false;

  /**
   *
   * @param cd
   */
  constructor(
    private cd: ChangeDetectorRef,
    private $messages: ChatMessageService,
    private $destroy: NgDestroy
  ) {}

  /**
   *
   */
  closeAcceptModal() {
    this.closeModal.emit();
  }

  /**
   *
   * @param e
   */
  handleFileInput(e: NzSafeAny, type: FileType) {
    this.file = e.target?.files?.item(0);
    this.type = type;

    if (this.file) {
      this.fileName = this.file.name;
      this.fileSize = this.file.size / 1024 / 1024;

      this.form.controls['file'].setValue(this.file);
      const reader = new FileReader();
      reader.onload = () => {
        this.fileSrc = reader.result as string;
        // console.log(this.fileSrc);

        this.cd.markForCheck();
      };
      reader.readAsDataURL(this.file);
    }
    this.inputImg.nativeElement.value = '';
  }

  /**
   *
   */
  deleteFile() {
    this.fileSrc = null;
    this.file = null;
    this.form.controls['file'].setValue(null);
  }

  /**
   *
   */
  sendFile() {
    if (this.id) {
      this.isLoading = true;

      const request = this.form.getRawValue();
      const offerRequest: Offer = {
        chat_id: this.id,
        msg: [
          { message: request.message, is_price: false, file: request.file },
        ],
      };

      this.$messages
        .sendOffer(offerRequest)
        .pipe(takeUntil(this.$destroy))
        .subscribe((w: any) => {
          if (w.success) {
            // console.log(w.data);

            this.form.reset();
            this.closeModal.emit();

            if (this.id) {
              this.addMessage.emit({
                chat_id: +this.id,
                owner: true,
                message: request.message,
                created_at: new Date(),
                file: w.data.file,
                fileType: this.type,
                file_original_name: this.fileName,
              } as Message);
            }

            this.file = null;
            this.fileSrc = null;
            this.isLoading = false;
            this.cd.markForCheck();
          }
        });
    }
  }

  /**
   *
   */
  playAndPauseVideo() {
    this.handleVideoAction = !this.handleVideoAction;

    if (this.screenVideo) {
      if (this.handleVideoAction) {
        this.screenVideo.nativeElement.play();
      } else {
        this.screenVideo.nativeElement.pause();
      }
    }
  }
}
