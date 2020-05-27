import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { BotStatusComponent } from './bot-status/bot-status.component';
import { ChatSoporteComponent } from './chat-soporte/chat-soporte.component';
import { UserComponent } from './user/user.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'bot-status',
        component: BotStatusComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin, Role.Empresa] }
    },
    {
        path: 'empresa',
        component: EmpresaComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Empresa] }
    },
    {
        path: 'create',
        component: CreateComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin, Role.Empresa] }
    },
    {
        path: 'chat-soporte',
        component: ChatSoporteComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.User] }
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin, Role.Empresa, Role.User] }
    },
    {
        path: 'login',
        component: LoginComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);