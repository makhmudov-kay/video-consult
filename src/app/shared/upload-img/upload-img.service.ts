import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UploadFilesDataService {
  /**
   *
   */
  files: File[] = [];

  /**
   *
   */
  docs: File[] = [];
}
