import { Routes } from '@angular/router';
import { CaravanaListComponent } from './caravana/caravana-list/caravana-list.component';
import { CaravanaFormComponent } from './caravana/caravana-form/caravana-form.component';
import { CaravanaViewComponent } from './caravana/caravana-view/caravana-view.component';
import { CaravanaEditComponent } from './caravana/caravana-edit/caravana-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'caravanas', pathMatch: 'full' },
  { path: 'caravanas', component: CaravanaListComponent },
  { path: 'caravanas/nueva', component: CaravanaFormComponent },
  { path: 'caravanas/:id', component: CaravanaViewComponent },
  { path: 'caravanas/:id/editar', component: CaravanaEditComponent }
];
