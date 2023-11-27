import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { QuillConfig } from './config';
@Component({
  selector: 'az-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalInfoComponent {
  /**
   *
   */
  @Input()
  form!: FormGroup;

  /**
   *
   */
  @Input()
  imageSrc!: NzSafeAny;

  /**
   *
   */
  @Input()
  docsSrc!: NzSafeAny;

  /**
   *
   */
  @Output()
  deletedImg = new EventEmitter<string>();

  /**
   *
   */
  @Output()
  deletedFile = new EventEmitter<number>();

  /**
   *
   */
  @Output()
  disableNextBtn = new EventEmitter<boolean>();

  /**
   *
   */
  readonly limitImgSize = 10;

  /**
   *
   */
  blockedAddImg = false;

  /**
   *
   */
  blockedAddFiles = false;

  /**
   *
   */
  options = QuillConfig;

  /**
   *
   */
  consultationLanguages = [
    { value: 'Русский', label: 'Русский' },
    { value: "O'zbekcha", label: "O'zbekcha" },
    { value: 'English', label: 'English' },
  ];

  /**
   *
   * @param cd
   */
  constructor(private cd: ChangeDetectorRef) {}

  /**
   *
   * @param image
   */
  imgForDelete(image: string) {
    this.deletedImg.emit(image);
  }

  /**
   *
   * @param image
   */
  fileForDelete(image: any) {
    this.deletedFile.emit(image);
  }

  /**
   *
   * @param size
   */
  checkFileSize(size: number) {
    // console.log(size);
    if (size > this.limitImgSize) {
      this.blockedAddImg = true;
      this.disableNextBtn.emit(this.blockedAddImg);
      this.cd.markForCheck();
      return;
    }
    this.blockedAddImg = false;
    this.cd.markForCheck();
  }

  /**
   *
   * @param size
   */
  checkDocFileSize(size: number) {
    // console.log(size);
    if (size > this.limitImgSize) {
      this.blockedAddFiles = true;
      this.disableNextBtn.emit(this.blockedAddFiles);
      this.cd.markForCheck();
      return;
    }
    this.blockedAddFiles = false;
    this.cd.markForCheck();
  }

  /**
   *
   * @param size
   */
  deletedFileSize(size: number) {
    // console.log(size);
    if (size > this.limitImgSize) {
      this.blockedAddImg = false;
      this.disableNextBtn.emit(this.blockedAddImg);
      this.cd.markForCheck();
    }
  }

  /**
   *
   * @param size
   */
  deletedDocFileSize(size: number) {
    if (size > this.limitImgSize) {
      this.blockedAddFiles = false;
      this.disableNextBtn.emit(this.blockedAddFiles);
      this.cd.markForCheck();
    }
  }
}
