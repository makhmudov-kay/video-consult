import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { UploadFilesDataService } from './upload-img.service';

@Component({
  selector: 'az-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadImgComponent {
  /**
   *
   */
  @Input()
  form!: FormGroup;

  /**
   *
   */
  @Input()
  imageSrc!: NzSafeAny[];

  /**
   *
   */
  @Input()
  docsSrc!: NzSafeAny[];

  /**
   *
   */
  @Input()
  limit!: number;

  /**
   *
   */
  @Input()
  uploadImage = true;

  /**
   *
   */
  @Output()
  deletedImage = new EventEmitter<string>();

  /**
   *
   */
  @Output()
  deletedFile = new EventEmitter<number>();

  /**
   *
   */
  @Output()
  fileSize = new EventEmitter<number>();

  /**
   *
   */
  @Output()
  deletedFileSize = new EventEmitter<number>();

  /**
   *
   */
  @Output()
  deletedDocFileSize = new EventEmitter<number>();

  /**
   *
   */
  @ViewChild('input')
  input!: ElementRef;

  /**
   *
   */
  fileName!: string;

  /**
   *
   */
  fileSizeValue = 0;

  /**
   *
   */
  docSizeValue = 0;

  /**
   *
   * @param cd
   */
  constructor(
    private cd: ChangeDetectorRef,
    private $files: UploadFilesDataService
  ) {}

  /**
   *
   * @param e
   */
  handleFileInput(e: NzSafeAny) {
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      if (file) {
        this.fileName = file.name;
        this.fileSizeValue = file.size / 1024 / 1024;

        this.uploadImage
          ? this.$files.files.push(file)
          : this.$files.docs.push(file);
        this.uploadImage
          ? this.form.controls['files'].setValue(this.$files.files)
          : this.form.controls['attached_files'].setValue(this.$files.docs);

        const reader = new FileReader();
        reader.onload = () => {
          this.uploadImage
            ? this.imageSrc.push({ file: reader.result, size: file.size })
            : this.docsSrc.push({
                file: reader.result,
                name: file.name,
                size: file.size,
              });
          this.fileSize.emit(file.size / 1024 / 1024);
          this.cd.markForCheck();
        };
        reader.readAsDataURL(file);
      }
      this.input.nativeElement.value = '';
    }
  }

  /**
   *
   * @param index
   */
  deleteNotUploadedImage(index: number, element: any) {
    if (this.uploadImage) {
      if (this.$files.files[index]?.size) {
        this.deletedFileSize.emit(this.$files.files[index].size / 1024 / 1024);
      } else {
        this.deletedFileSize.emit(this.imageSrc[index].size / 1024 / 1024);
      }
      if (this.imageSrc.length > this.$files.files.length) {
        let fileIndex = index - this.imageSrc.length;
        console.log('befor spliced', this.$files.files);
        this.$files.files.splice(fileIndex, 1);
        console.log('after spliced', this.$files.files);
      } else {
        console.log('befor spliced', this.$files.files);
        this.$files.files.splice(index, 1);
        console.log('after spliced', this.$files.files);
      }
      this.imageSrc.splice(index, 1);
      this.form.controls['files'].setValue(this.$files.files);
      this.fileSizeValue = 0;
      if (typeof element === 'string') {
        const deletedImg = element.split('/').slice(4).join('/');
        this.deletedImage.emit(deletedImg);
      }
    } else {
      if (this.$files.docs[index]?.size) {
        this.deletedDocFileSize.emit(
          this.$files.docs[index].size / 1024 / 1024
        );
      } else {
        this.deletedDocFileSize.emit(this.docsSrc[index].size / 1024 / 1024);
      }
      if (this.docsSrc.length > this.$files.docs.length) {
        let fileIndex = index - this.docsSrc.length;
        this.$files.docs.splice(fileIndex, 1);
      } else {
        this.$files.docs.splice(index, 1);
      }
      this.docsSrc.splice(index, 1);
      this.form.controls['attached_files'].setValue(this.$files.docs);
      this.docSizeValue = 0;
      this.deletedFile.emit(element.id);
    }
  }
}
