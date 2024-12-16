import { Routes } from '@angular/router';
import { ShowsComponent } from './pages/shows/shows.component';
import { ShowComponent } from './pages/show/show.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard, NoAuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'shows',
    component: ShowsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'shows/:id',
    component: ShowComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
