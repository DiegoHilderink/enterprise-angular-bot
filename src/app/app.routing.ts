import { RouterModule } from '@angular/router';

import { BlockComponent } from './admin/block/block.component';
import { InitComponent } from './public/init/init.component';

export const appRoutingModule = RouterModule.forRoot([
    { path: '', component: InitComponent },
    { path: 'block', component: BlockComponent },
]);