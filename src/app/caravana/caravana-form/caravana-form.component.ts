import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaravanaFormularioDto } from '../../dto/caravana/caravana-formulario-dto';
import { CaravanaService } from '../caravana.service';
import { CiudadService, CiudadDto } from '../../ciudad/ciudad.service';

@Component({
  selector: 'app-caravana-form',
  templateUrl: './caravana-form.component.html'
})
export class CaravanaFormComponent implements OnInit {
  formulario: CaravanaFormularioDto = new CaravanaFormularioDto();
  ciudades: CiudadDto[] = [];

  constructor(
    private caravanaService: CaravanaService,
    private ciudadService: CiudadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ciudadService.listarCiudades().subscribe(data => {
      this.ciudades = data;
    });
  }

  crearCaravana(): void {
    this.caravanaService.crearCaravana(this.formulario).subscribe({
      next: () => this.router.navigate(['/caravanas']),
      error: (err) => {
        console.error('Error al crear caravana:', err);
        alert('Hubo un error al crear la caravana. Asegúrate de seleccionar una ciudad válida.');
      }
    });
  }
}

