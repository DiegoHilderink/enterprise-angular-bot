import { RouterModule } from '@angular/router';

import { BlockComponent } from './admin/block/block.component';
import { UserComponent } from './admin/user/user.component';
import { InitComponent } from './public/init/init.component';
import { AuthGuard } from './core/helpers';
import { LoginComponent } from './public/login';
import { ChatComponent } from './public/chat/chat.component';


export const appRoutingModule = RouterModule.forRoot([
    { path: '', component: InitComponent , canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'block', component: BlockComponent },
    { path: 'user', component: UserComponent },
    { path: 'chat', component: ChatComponent },

    { path: '**', redirectTo: '' },
]);