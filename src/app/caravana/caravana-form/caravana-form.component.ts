import { Component } from '@angular/core';
import { CaravanaFormularioDto } from '../dto/caravana-formulario-dto';
import { CaravanaService } from '../caravana.service';

@Component({
  selector: 'app-caravana-form',
  templateUrl: './caravana-form.component.html'
})
export class CaravanaFormComponent {
  formulario: CaravanaFormularioDto = new CaravanaFormularioDto();

  constructor(private caravanaService: CaravanaService) {}

  crearCaravana(): void {
    this.caravanaService.crearCaravana(this.formulario).subscribe(() => {
      alert('Caravana creada con éxito');
      this.formulario = new CaravanaFormularioDto(); // Limpiar formulario
    });
  }
}

