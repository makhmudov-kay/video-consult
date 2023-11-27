import { Routes, RouterModule } from '@angular/router';
import { ChatWindowComponent } from './chat-window.component';

const routes: Routes = [{ path: '', component: ChatWindowComponent }];

export const ChatWindowRoutes = RouterModule.forChild(routes);
