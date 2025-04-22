import { Routes } from '@angular/router';
import { CaravanaListComponent } from './caravana/caravana-list/caravana-list.component';
import { CaravanaFormComponent } from './caravana/caravana-form/caravana-form.component';
import { CaravanaViewComponent } from './caravana/caravana-view/caravana-view.component';
import { CaravanaEditComponent } from './caravana/caravana-edit/caravana-edit.component';
import { CaravanaProductoListComponent } from './caravana/caravana-producto-list/caravana-producto-list.component';
import { CaravanaProductoFormComponent } from './caravana/caravana-producto-form/caravana-producto-form.component';
import { CiudadListComponent } from './ciudad/ciudad-list/ciudad-list.component';
import { CiudadViewComponent } from './ciudad/ciudad-view/ciudad-view.component';
import { CiudadEditComponent } from './ciudad/ciudad-edit/ciudad-edit.component';
import { CiudadFormComponent } from './ciudad/ciudad-form/ciudad-form.component';
import { CiudadProductosComponent } from './ciudad/ciudad-productos/ciudad-productos.component';
import { CiudadServiciosComponent } from './ciudad/ciudad-servicios/ciudad-servicios.component';
import { CiudadRutasComponent } from './ciudad/ciudad-rutas/ciudad-rutas.component';


export const routes: Routes = [
  { path: '', redirectTo: 'caravanas', pathMatch: 'full' },
  { path: 'caravanas', component: CaravanaListComponent },
  { path: 'caravanas/nueva', component: CaravanaFormComponent },
  { path: 'caravanas/:id', component: CaravanaViewComponent },
  { path: 'caravanas/:id/editar', component: CaravanaEditComponent },
  { path: 'caravana-productos', component: CaravanaProductoListComponent },
  { path: 'caravana-producto-form', component: CaravanaProductoFormComponent },
  { path: 'ciudades', component: CiudadListComponent },
  { path: 'ciudad/:id', component: CiudadViewComponent },
  { path: 'ciudad/:id/editar', component: CiudadEditComponent },
  { path: 'ciudad-form', component: CiudadFormComponent },
  { path: 'ciudad/:id/productos', component: CiudadProductosComponent },
  { path: 'ciudad/:id/servicios', component: CiudadServiciosComponent },
  { path: 'ciudad/:id/rutas', component: CiudadRutasComponent }



];
