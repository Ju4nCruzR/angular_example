import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'caravanas',
    loadComponent: () => import('./caravana/caravana-list/caravana-list.component').then(m => m.CaravanaListComponent)
  },
  {
    path: 'caravana/nueva',
    loadComponent: () => import('./caravana/caravana-form/caravana-form.component').then(m => m.CaravanaFormComponent)
  },
  {
    path: 'caravana/:id',
    loadComponent: () => import('./caravana/caravana-detail/caravana-detail.component').then(m => m.CaravanaDetailComponent)
  },
  {
    path: 'caravana/:id/editar',
    loadComponent: () => import('./caravana/caravana-form/caravana-form.component').then(m => m.CaravanaFormComponent)
  },

  {
    path: 'ciudades',
    loadComponent: () => import('./ciudad/ciudad-list/ciudad-list.component').then(m => m.CiudadListComponent)
  },
  {
    path: 'ciudad/nueva',
    loadComponent: () => import('./ciudad/ciudad-form/ciudad-form.component').then(m => m.CiudadFormComponent)
  },
  {
    path: 'ciudad/:id',
    loadComponent: () => import('./ciudad/ciudad-detail/ciudad-detail.component').then(m => m.CiudadDetailComponent)
  },
  {
    path: 'ciudad/:id/editar',
    loadComponent: () => import('./ciudad/ciudad-form/ciudad-form.component').then(m => m.CiudadFormComponent)
  },

  { path: '**', redirectTo: 'caravanas' }
];

