import { DatePipe, registerLocaleData } from '@angular/common';
import { Injector, LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, ru_RU } from 'ng-zorro-antd/i18n';
import {
  InjectorHelper,
  MessageModalModule,
  NgxAzCoreModule,
  DITokens,
  PostMessageComponent,
  SpinModule,
  HandleErrorInterceptor,
  CoreStateList,
} from 'ngx-az-core';
import ru from '@angular/common/locales/ru';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoCallComponent } from './shared/chat-window/components/video-call/video-call.component';
import { environment } from '../environments/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ServiceWorkerModule } from '@angular/service-worker';
import { urls } from 'urls';
import { NgxsModule } from '@ngxs/store';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { QuillModule } from 'ngx-quill';

registerLocaleData(ru);
const providers = [
  provideEnvironmentNgxMask(),
  { provide: NZ_I18N, useValue: ru_RU },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HandleErrorInterceptor,
    multi: true,
  },
  { provide: LOCALE_ID, useValue: 'ru-RU' },
  {
    provide: DITokens.ENDPOINT_URL,
    useValue: environment.endpoint,
  },
  {
    provide: DITokens.ENDPOINT_OAUTH_URL,
    useValue: environment.endpointOAuth,
  },
  {
    provide: DITokens.OAUTH_Data,
    useFactory: () => {
      return {
        client_id: '994046d1-b382-4b8d-933d-428a17f0003b',
        client_secret: 'DA6uLUWkqF0bRZKvZzbZrcxMSEyafqDZRrVQs16e',
        redirect_uri: `${urls.agroMaslahat}/`,
      };
    },
  },
  {
    provide: DITokens.URLS,
    useValue: urls,
  },
  {
    provide: DITokens.ENDPOINT_API_CORE_URL,
    useValue: environment.endpointApiCore,
  },
  DatePipe,
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.endpoint + 'translate/', '');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxAzCoreModule,
    MessageModalModule,
    SpinModule,
    VideoCallComponent,
    PostMessageComponent,
    QuillModule.forRoot(),

    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,

    /**
     * NGX-TRANSLATE
     */
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    /** NgxsModule for store usage, StateList is for states which ngxs store serves */
    NgxsModule.forRoot(CoreStateList, {}),

    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers,
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    InjectorHelper.injector = this.injector;
  }
}
