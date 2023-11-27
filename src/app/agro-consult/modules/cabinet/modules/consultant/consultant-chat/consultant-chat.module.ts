import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { SearchInputModule } from './../../../../../../shared/search-input/search-input.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantChatComponent } from './consultant-chat.component';
import { ConsultantChatRoutes } from './consultant-chat.routing';
import { ChatResponseCardModule } from 'projects/agro-consult/src/app/shared/chat-response-card/chat-response-card.module';
import { RadioGroupModule } from 'projects/agro-consult/src/app/shared/radio-group/radio-group.module';
import { ChatItemModule } from 'projects/agro-consult/src/app/shared/chat-item/chat-item.module';
import { ApplicationFilterModule } from 'projects/agro-consult/src/app/shared/application-filter/application-filter.module';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { EmptyApplicationModule } from 'projects/agro-consult/src/app/shared/empty-application/empty-application.module';
import { FilterComponent } from './filter/filter.component';
import { DrawerModule } from 'projects/agro-consult/src/app/shared/drawer/drawer.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ConsultantChatRoutes,
    SearchInputModule,
    FormsModule,
    ReactiveFormsModule,
    ChatResponseCardModule,
    RadioGroupModule,
    ChatItemModule,
    ApplicationFilterModule,
    EmptyApplicationModule,
    TranslateModule,
    DrawerModule,

    /* NG-ZORRO */
    NzRadioModule,
    NzTypographyModule,
    NzAvatarModule,
    NzDrawerModule,
    NzDividerModule,
    NzSkeletonModule,
    NzIconModule,
  ],
  declarations: [ConsultantChatComponent, FilterComponent],
})
export class ConsultantChatModule {}
