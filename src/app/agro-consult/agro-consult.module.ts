import { FormatDateFnsPipe } from './../../../../agro-news/src/app/shared/formateDateFns/formatDateFns.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgroConsultComponent } from './agro-consult.component';
import { AgroConsultRoutes } from './agro-consult.routing';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { LanguageComponent } from './components/header/components/language/language.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

/* NG-ZORRO */
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import {
  CabinetLogosModule,
  EcoSystemMobileModule,
  EcoSystemModule,
  LanguageModule,
  LogoModule,
} from 'ngx-az-core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { SvgModule } from '../shared/svg/svg.module';
import { PopoverContentComponent } from './components/header/components/popover-content/popover-content.component';
import { PopoverMenuComponent } from './components/header/components/popover-content/popover-menu/popover-menu.component';
import { LinksComponent } from './components/header/components/links/links.component';
import { DrawerContentComponent } from './components/header/components/drawer-content/drawer-content.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { FormateDateFnsModule } from 'projects/agro-news/src/app/shared/formateDateFns/formateDateFns.module';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NotificationsComponent } from './components/header/components/notifications/notifications.component';
import { InviteCardComponent } from './components/invite-card/invite-card.component';
import { MessageTypeComponent } from './components/header/components/notifications/message-type/message-type.component';
import { ResumeTypeComponent } from './components/header/components/notifications/resume/resume-type.component';
import { PrivateApplicationTypeComponent } from './components/header/components/notifications/private-application-type/private-application-type.component';
import { BlockedApplicationTypeComponent } from './components/header/components/notifications/blocked-application-type/blocked-application-type.component';
import { ApplicationsCountComponent } from './components/header/components/notifications/applications-count/applications-count.component';
import { ResponseTypeComponent } from './components/header/components/notifications/response-type/response-type.component';
import { WarningTypeComponent } from './components/header/components/notifications/warning-type/warning-type.component';
import { RememberTypeComponent } from './components/header/components/notifications/remember-type/remember-type.component';
import { PaymentTypeComponent } from './components/header/components/notifications/payment-type/payment-type.component';
import { CurrencyModule } from 'projects/advertisement/src/app/shared/pipes/currency/currency.module';
import { TgBotLinkComponent } from '../shared/tg-bot-link/tg-bot-link.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@NgModule({
  imports: [
    CommonModule,
    AgroConsultRoutes,
    FormsModule,
    ReactiveFormsModule,
    CabinetLogosModule,
    LanguageModule,
    EcoSystemModule,
    EcoSystemMobileModule,
    LogoModule,
    TranslateModule,
    SvgModule,
    FormateDateFnsModule,
    LogoComponent,

    /* NG-ZORRO */
    NzSelectModule,
    NzPopoverModule,
    NzAvatarModule,
    NzIconModule,
    NzDividerModule,
    NzMenuModule,
    NzGridModule,
    NzDrawerModule,
    NzEmptyModule,
    NzBadgeModule,
    NzNotificationModule,
    CurrencyModule,
    TgBotLinkComponent,
    NzTabsModule,
  ],
  declarations: [
    AgroConsultComponent,
    HeaderComponent,
    FooterComponent,
    LanguageComponent,
    PopoverContentComponent,
    PopoverMenuComponent,
    LinksComponent,
    DrawerContentComponent,
    NotificationsComponent,
    InviteCardComponent,
    MessageTypeComponent,
    ResumeTypeComponent,
    PrivateApplicationTypeComponent,
    BlockedApplicationTypeComponent,
    ApplicationsCountComponent,
    ResponseTypeComponent,
    WarningTypeComponent,
    RememberTypeComponent,
    PaymentTypeComponent,
  ],
})
export class AgroConsultModule {}
