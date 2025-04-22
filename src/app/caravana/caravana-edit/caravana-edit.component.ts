import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaravanaService } from '../caravana.service';
import { CaravanaFormularioDto } from '../dto/caravana-formulario-dto';

@Component({
  selector: 'app-caravana-edit',
  templateUrl: './caravana-edit.component.html'
})
export class CaravanaEditComponent implements OnInit {
  caravanaId!: number;
  formulario: CaravanaFormularioDto = new CaravanaFormularioDto();

  constructor(
    private route: ActivatedRoute,
    private caravanaService: CaravanaService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.caravanaId = +id;
      this.caravanaService.obtenerCaravana(this.caravanaId).subscribe(data => {
        this.formulario.nombreCaravana = data.nombre;
        this.formulario.velocidadCaravana = data.velocidad;
        this.formulario.capacidadMaximaCargaCaravana = data.capacidadMaximaCarga;
        this.formulario.dineroDisponibleCaravana = data.dineroDisponible;
        this.formulario.puntosDeVidaCaravana = data.puntosDeVida;

        this.formulario.ciudadId = 1; // ⚠️ Ajusta esto si tienes el ID de la ciudad actual
      });
    }
  }

  actualizarCaravana(): void {
    this.caravanaService.actualizarCaravana(this.caravanaId, this.formulario)
      .subscribe(() => alert('Caravana actualizada correctamente'));
  }
}
