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

  // 🔷 Producto
  {
    path: 'productos',
    loadComponent: () => import('./producto/producto-list/producto-list.component').then(m => m.ProductoListComponent)
  },
  {
    path: 'producto/nueva',
    loadComponent: () => import('./producto/producto-form/producto-form.component').then(m => m.ProductoFormComponent)
  },
  {
    path: 'producto/:id',
    loadComponent: () => import('./producto/producto-detail/producto-detail.component').then(m => m.ProductoDetailComponent)
  },
  {
    path: 'producto/:id/editar',
    loadComponent: () => import('./producto/producto-form/producto-form.component').then(m => m.ProductoFormComponent)
  },

  // 🔶 Servicio
  {
    path: 'servicios',
    loadComponent: () => import('./servicio/servicio-list/servicio-list.component').then(m => m.ServicioListComponent)
  },
  {
    path: 'servicio/nueva',
    loadComponent: () => import('./servicio/servicio-form/servicio-form.component').then(m => m.ServicioFormComponent)
  },
  {
    path: 'servicio/:id',
    loadComponent: () => import('./servicio/servicio-detail/servicio-detail.component').then(m => m.ServicioDetailComponent)
  },
  {
    path: 'servicio/:id/editar',
    loadComponent: () => import('./servicio/servicio-form/servicio-form.component').then(m => m.ServicioFormComponent)
  },

  // 🔷 Rutas
  {
    path: 'rutas',
    loadComponent: () => import('./ruta/ruta-list/ruta-list.component').then(m => m.RutaListComponent)
  },
  {
    path: 'ruta/nueva',
    loadComponent: () => import('./ruta/ruta-form/ruta-form.component').then(m => m.RutaFormComponent)
  },
  {
    path: 'ruta/:id',
    loadComponent: () => import('./ruta/ruta-detail/ruta-detail.component').then(m => m.RutaDetailComponent)
  },
  {
    path: 'ruta/:id/editar',
    loadComponent: () => import('./ruta/ruta-form/ruta-form.component').then(m => m.RutaFormComponent)
  },

  {
    path: 'jugadores',
    loadComponent: () => import('./jugador/jugador-list/jugador-list.component').then(m => m.JugadorListComponent)
  },
  {
    path: 'jugador/nuevo',
    loadComponent: () => import('./jugador/jugador-form/jugador-form.component').then(m => m.JugadorFormComponent)
  },
  {
    path: 'jugador/:id',
    loadComponent: () => import('./jugador/jugador-detail/jugador-detail.component').then(m => m.JugadorDetailComponent)
  },
  {
    path: 'jugador/:id/editar',
    loadComponent: () => import('./jugador/jugador-form/jugador-form.component').then(m => m.JugadorFormComponent)
  },
  

  { path: '**', redirectTo: 'caravanas' }
];

