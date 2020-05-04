import { RouterModule } from '@angular/router';

import { BlockComponent } from './admin/block/block.component';
import { InitComponent } from './public/init/init.component';
import { AuthGuard } from './core/helpers';
import { LoginComponent } from './public/login';


export const appRoutingModule = RouterModule.forRoot([
    { path: '', component: InitComponent , canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'block', component: BlockComponent },

    { path: '**', redirectTo: '' },
]);