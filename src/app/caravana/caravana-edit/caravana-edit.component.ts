import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaravanaFormularioDto } from '../../dto/caravana/caravana-formulario-dto';
import { CaravanaService } from '../caravana.service';
import { CiudadService, CiudadDto } from '../../ciudad/ciudad.service';
import { CaravanaDetalleDto } from '../../dto/caravana/caravana-detalle-dto';

@Component({
  selector: 'app-caravana-edit',
  templateUrl: './caravana-edit.component.html'
})
export class CaravanaEditComponent implements OnInit {
  formulario: CaravanaFormularioDto = new CaravanaFormularioDto();
  ciudades: CiudadDto[] = [];
  caravanaId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private caravanaService: CaravanaService,
    private ciudadService: CiudadService
  ) {}

  ngOnInit(): void {
    this.caravanaId = Number(this.route.snapshot.paramMap.get('id'));

    this.ciudadService.listarCiudades().subscribe(ciudades => {
      this.ciudades = ciudades;

      this.caravanaService.obtenerCaravana(this.caravanaId).subscribe((data: CaravanaDetalleDto) => {
        const caravana = data.caravana;

        this.formulario = {
          nombreCaravana: caravana.nombreCaravana,
          velocidadCaravana: caravana.velocidadCaravana,
          capacidadMaximaCargaCaravana: caravana.capacidadMaximaCargaCaravana,
          dineroDisponibleCaravana: caravana.dineroDisponibleCaravana,
          puntosDeVidaCaravana: caravana.puntosDeVidaCaravana,
          ciudadId: this.ciudades.find(c => c.nombreCiudad === caravana.nombreCiudadActual)?.id || 0
        };
      });
    });
  }

  actualizarCaravana(): void {
    this.caravanaService.actualizarCaravana(this.caravanaId, this.formulario).subscribe({
      next: () => this.router.navigate(['/caravanas']),
      error: err => {
        console.error('Error al actualizar caravana:', err);
        alert('Error al actualizar. Verifica que los datos sean válidos.');
      }
    });
  }
}


