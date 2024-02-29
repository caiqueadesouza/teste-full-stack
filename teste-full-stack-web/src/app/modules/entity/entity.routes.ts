import { Routes } from '@angular/router';
import { EntityReadComponent } from './entity-read/entity-read.component';
import { EntityViewComponent } from './entity-view/entity-view.component';
import { EntityCreateComponent } from './entity-create/entity-create.component';
import { EntityUpdateComponent } from './entity-update/entity-update.component';

const routes: Routes = [
    {
        path: '',
        component: EntityReadComponent,
        pathMatch: 'full',
    },
    {
        path: 'create',
        component: EntityCreateComponent,
    },
    {
        path: 'update/:id',
        component: EntityUpdateComponent,
    },
    {
        path: ':id',
        component: EntityViewComponent,
    },
];

export default routes;
