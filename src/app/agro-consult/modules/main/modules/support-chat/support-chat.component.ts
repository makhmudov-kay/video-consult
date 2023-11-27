import { NzSafeAny } from 'ng-zorro-antd/core/types';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SupportChatLogicComponent, SupportChatResponse } from 'ngx-az-chat';
import { DatePipe } from '@angular/common';
import { SupportChatService } from './service/support-chat.service';
import { NzImage, NzImageService } from 'ng-zorro-antd/image';

@Component({
  selector: 'az-support-chat',
  templateUrl: './support-chat.component.html',
  styleUrls: ['./support-chat.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportChatComponent
  extends SupportChatLogicComponent
  implements OnInit
{
  /**
   *
   */
  message?: string;

  /**
   *
   */
  @ViewChild('scrollMe')
  public set myScrollContainer(scrollElement: ElementRef | undefined) {
    if (scrollElement) {
      this.setScrollContainer(scrollElement);
    }
  }

  /**
   *
   * @param $nzImage
   */
  @ViewChild('uploadImage')
  uploadImage!: ElementRef;

  /**
   *
   */
  size = 64;

  /**
   *
   */
  constructor(
    protected override $data: SupportChatService,
    protected override cd: ChangeDetectorRef,
    protected override datePipe: DatePipe,
    private $nzImage: NzImageService
  ) {
    super($data, cd, datePipe);
  }

  /**
   *
   * @param image
   */
  viewImage(imageSrc: string) {
    const image: NzImage = { src: imageSrc };
    this.$nzImage.preview([image], { nzZoom: 1.5, nzRotate: 0 });
  }

  /**
   *
   * @param message
   */
  reUpload(message: SupportChatResponse) {
    // this.reSendImageChange.emit(message);
  }

  /**
   *
   * @param message
   */
  handleSendMessage(message?: string) {
    this.message = '';
    this.sendMessage(message);
  }

  /**
   *
   * @param e
   */
  handleSendMessageByEnter(e: any) {
    e.preventDefault();
    this.sendMessage(e.target.value);
    this.message = '';
  }

  /**
   *
   */
  onResize(e: any) {
    if (e.target.innerWidth < 768) {
      this.size = 54;
    } else if (e.target.innerWidth > 767) {
      this.size = 64;
    } else if (e.target.innerWidth < 576) {
      this.size = 32;
    }

    this.cd.markForCheck();
  }

  /**
   *
   * @param e
   */
  handleImages(e: NzSafeAny) {
    this.handleImagesInput(e);
    this.uploadImage.nativeElement.value = '';
  }
}
