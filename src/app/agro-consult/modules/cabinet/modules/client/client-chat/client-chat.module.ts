import { TranslateModule } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DrawerModule } from 'projects/agro-consult/src/app/shared/drawer/drawer.module';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientChatComponent } from './client-chat.component';
import { ClientChatRoutes } from './client-chat.routing';
import { SearchInputModule } from 'projects/agro-consult/src/app/shared/search-input/search-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatResponseCardModule } from 'projects/agro-consult/src/app/shared/chat-response-card/chat-response-card.module';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { RadioGroupModule } from 'projects/agro-consult/src/app/shared/radio-group/radio-group.module';
import { ChatItemModule } from 'projects/agro-consult/src/app/shared/chat-item/chat-item.module';
import { EmptyApplicationModule } from 'projects/agro-consult/src/app/shared/empty-application/empty-application.module';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FilterComponent } from './filter/filter.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@NgModule({
  imports: [
    CommonModule,
    ClientChatRoutes,
    SearchInputModule,
    FormsModule,
    ChatResponseCardModule,
    RadioGroupModule,
    ChatItemModule,
    EmptyApplicationModule,
    FormsModule,
    ReactiveFormsModule,
    DrawerModule,
    TranslateModule,

    /* NG-ZORRO */
    NzRadioModule,
    NzTypographyModule,
    NzAvatarModule,
    NzDrawerModule,
    NzSelectModule,
    NzSkeletonModule,
    NzIconModule,
  ],
  declarations: [ClientChatComponent, FilterComponent],
})
export class ClientChatModule {}
