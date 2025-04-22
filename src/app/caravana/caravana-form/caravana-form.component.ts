import { Component } from '@angular/core';
import { CaravanaFormularioDto } from '../../dto/caravana/caravana-formulario-dto';
import { CaravanaService } from '../caravana.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caravana-form',
  templateUrl: './caravana-form.component.html'
})
export class CaravanaFormComponent {
  formulario: CaravanaFormularioDto = new CaravanaFormularioDto();

  constructor(
    private caravanaService: CaravanaService,
    private router: Router
  ) {}

  crearCaravana(): void {
    this.caravanaService.crearCaravana(this.formulario).subscribe(() => {
      alert('Caravana creada con éxito');
      this.router.navigate(['/caravanas']); // Redirige a la lista
    });
  }
}

