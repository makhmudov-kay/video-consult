import { Injectable } from '@angular/core';
import AgoraRTC, {
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  ILocalAudioTrack,
  ILocalVideoTrack,
} from 'agora-rtc-sdk-ng';
import { BehaviorSubject } from 'rxjs';

export interface IUser {
  uid: number;
  name?: string;
}
export interface IRtc {
  client: IAgoraRTCClient;
  localAudioTrack: IMicrophoneAudioTrack;
  localVideoTrack: ILocalVideoTrack | null | any;
}

@Injectable({
  providedIn: 'root',
})
export class RtcstreamService {
  rtc: IRtc = {
    // For the local client.
    client: null as any,
    // For the local audio and video tracks.
    localAudioTrack: null as any,
    localVideoTrack: null as any,
  };

  options = {
    appId: '', // set your appid here
    channel: '', // Set the channel name.
    token: '', // Pass a token if your project enables the App Certificate.
  };

  remoteUsers: IUser[] = []; // To add remote users in list
  remoteTracks: any = {};

  updateUserInfo = new BehaviorSubject<any>(null); // to update remote users name

  constructor() {}

  createRTCClient() {
    this.rtc.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' }); //h264
  }

  // To join a call with tracks (video or audio)
  async localUser(token: any) {
    const uid = await this.rtc.client.join(
      this.options.appId,
      this.options.channel,
      token
    );

    const cameras = await AgoraRTC.getCameras();
    const microphones = await AgoraRTC.getMicrophones();

    // Create an audio track from the audio sampled by a microphone.
    this.rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack({
      microphoneId: microphones[0].deviceId,
    });

    if (cameras.length) {
      // Create a video track from the video captured by a camera.
      this.rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
        cameraId: cameras[0].deviceId,
        encoderConfig: {
          width: { min: 640, max: 1280 },
          height: { min: 480, max: 720 },
          frameRate: { min: 5, max: 30 },
          bitrateMin: 400,
          bitrateMax: 2000,
        },
      });

      // Publish the local audio and video tracks to the channel.
      this.rtc.localVideoTrack.play('local-player');
      // channel for other users to subscribe to it.
      await this.rtc.client?.publish([
        this.rtc.localAudioTrack,
        this.rtc.localVideoTrack,
      ]);
    } else {
      await this.rtc.client?.publish([this.rtc.localAudioTrack]);
    }
  }

  /**
   *
   */
  async switchToScreenShare() {
    if (this.rtc.localVideoTrack) {
      await this.rtc.client?.unpublish(this.rtc.localVideoTrack);
      this.rtc.localVideoTrack.close();
      this.rtc.localVideoTrack = null;
    }

    try {
      const screenVideoTrack = await AgoraRTC.createScreenVideoTrack({
        encoderConfig: {
          width: 1280,
          height: 720,
        },
      });

      this.rtc.localVideoTrack = screenVideoTrack;
      await this.rtc.client?.publish(this.rtc.localVideoTrack);
    } catch (error) {
      console.error('Ошибка при запуске захвата экрана:', error);
    }
  }

  /**
   *
   */
  async switchToCamera() {
    if (this.rtc.localVideoTrack) {
      await this.rtc.client?.unpublish(this.rtc.localVideoTrack);
      this.rtc.localVideoTrack.close();
      this.rtc.localVideoTrack = null;
    }

    const cameras = await AgoraRTC.getCameras();

    if (cameras.length) {
      const cameraVideoTrack = await AgoraRTC.createCameraVideoTrack({
        cameraId: cameras[0].deviceId,
        encoderConfig: {
          width: { min: 640, max: 1280 },
          height: { min: 480, max: 720 },
          frameRate: { min: 5, max: 30 },
          bitrateMin: 400,
          bitrateMax: 2000,
        },
      });

      this.rtc.localVideoTrack = cameraVideoTrack;
      await this.rtc.client?.publish(this.rtc.localVideoTrack);
    }
  }

  agoraServerEvents(rtc: any) {
    rtc.client.on('user-published', async (user: any, mediaType: any) => {
      this.remoteTracks[user.uid] = user;

      await rtc.client.subscribe(user, mediaType);

      if (mediaType === 'video') {
        user.videoTrack.play('remote-player');
      }

      if (mediaType === 'audio') {
        user.audioTrack.play();
      }

      if (mediaType === 'screen') {
        user.videoTrack.play('remote-player');
      }
    });

    rtc.client.on('user-unpublished', async (user: any, mediaType: string) => {
      await rtc.client.unsubscribe(user, mediaType);

      if (mediaType === 'video') {
        user.videoTrack?.stop();
      } else {
        console.log(mediaType);
      }
    });

    rtc.client.on('user-joined', (user: any) => {
      let id = user.uid;

      this.remoteUsers.push({ uid: +id });
      this.updateUserInfo.next(id);
      console.log('user-joined', user, this.remoteUsers, 'event1');
    });
  }
  // To leave channel-
  async leaveCall() {
    // Destroy the local audio and video tracks.
    this.rtc.localAudioTrack?.close();
    if (this.rtc.localVideoTrack) {
      if (Array.isArray(this.rtc.localVideoTrack)) {
        this.rtc.localVideoTrack[0]?.close();
        this.rtc.localVideoTrack[1]?.close();
      } else {
        this.rtc.localVideoTrack?.close();
      }
      this.rtc.client?.unpublish(this.rtc.localVideoTrack);
      this.rtc.localVideoTrack = null;
    }

    // Traverse all remote users.
    this.rtc.client?.remoteUsers.forEach((user) => {
      // Destroy the dynamically created DIV container.
      const playerContainer = document.getElementById('remote-player');
      playerContainer && playerContainer.remove();
    });
    // Leave the channel.
    await this.rtc.client?.leave();
  }

  // rtc token
  async generateTokenAndUid() {
    return { token: this.options.token };
  }

  toggleMutedAudio() {
    if (this.rtc.localAudioTrack) {
      const state = !this.rtc.localAudioTrack.muted;
      this.rtc.localAudioTrack.setMuted(state);
      return state;
    }
    return false;
  }

  toggleHideVideo() {
    if (this.rtc.localVideoTrack) {
      if (!Array.isArray(this.rtc.localVideoTrack)) {
        const state = !this.rtc.localVideoTrack.muted;
        this.rtc.localVideoTrack.setMuted(state);
        return state;
      }
    }
    return false;
  }
}
