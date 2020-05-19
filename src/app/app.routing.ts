import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { BotStatusComponent } from './bot-status/bot-status.component';
import { ChatSoporteComponent } from './chat-soporte/chat-soporte.component';

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
        data: { roles: [Role.Admin, Role.Empresa, Role.Empleado] }
    },
    {
        path: 'chat-soporte',
        component: ChatSoporteComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'login',
        component: LoginComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);