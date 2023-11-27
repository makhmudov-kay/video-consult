import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MediaPermissionService {
  undefinedVideo = false;

  getPermissions = () => {
    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if ((navigator as any).mediaDevices === undefined) {
      (navigator as any).mediaDevices = {};
    }

    // Some browsers partially implement mediaDevices. We can't just assign an object
    // with getUserMedia as it would overwrite existing properties.
    // Here, we will just add the getUserMedia property if it's missing.
    if ((navigator as any).mediaDevices.getUserMedia === undefined) {
      (navigator as any).mediaDevices.getUserMedia = function (
        constraints: any
      ) {
        // First get ahold of the legacy getUserMedia, if present
        const getUserMedia =
          (navigator as any).webkitGetUserMedia ||
          (navigator as any).mozGetUserMedia;

        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
          return Promise.reject(
            new Error('getUserMedia is not implemented in this browser')
          );
        }

        // Otherwise, wrap the call to the old (navigator as any).getUserMedia with a Promise
        return new Promise((resolve, reject) => {
          getUserMedia.call(navigator as any, constraints, resolve, reject);
        });
      };
    }
    (navigator as any).mediaDevices.getUserMedia =
      (navigator as any).mediaDevices.getUserMedia ||
      (navigator as any).webkitGetUserMedia ||
      (navigator as any).mozGetUserMedia;

    return new Promise((resolve, reject) => {
      (navigator as any).mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream: any) => {
          resolve(stream);
        })
        .catch(() => {
          this.undefinedVideo = true;
          (navigator as any).mediaDevices
            .getUserMedia({ audio: true })
            .then((stream: any) => {
              resolve(stream);
            })
            .catch((err: any) => {
              reject(err);
              //   throw new Error(`Unable to fetch stream ${err}`);
            });
        });
    });
  };
}
