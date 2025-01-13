import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'tasks',
        loadChildren: () => import('./components/pages/task/task.routes').then(r => r.routes),
      },
      { path: '**', redirectTo: 'tasks' },
];
