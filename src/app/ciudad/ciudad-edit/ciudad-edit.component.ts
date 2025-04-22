import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadService } from '../ciudad.service';
import { CiudadFormularioDto } from '../../dto/ciudad/ciudad-formulario-dto';
import { CiudadDetalleDto } from '../../dto/ciudad/ciudad-detalle-dto';

@Component({
  selector: 'app-ciudad-edit',
  templateUrl: './ciudad-edit.component.html',
  styleUrls: ['./ciudad-edit.component.css']
})
export class CiudadEditComponent implements OnInit {
  ciudadId!: number;
  formulario: CiudadFormularioDto = new CiudadFormularioDto();
  mensaje: string = '';

  // Campos de texto auxiliares para editar listas de IDs
  productoIdsTexto: string = '';
  servicioIdsTexto: string = '';
  rutaIdsTexto: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ciudadService: CiudadService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ciudadId = +id;
      this.ciudadService.verCiudad(this.ciudadId).subscribe((detalle: CiudadDetalleDto) => {
        this.formulario.nombreCiudad = detalle.ciudad.nombreCiudad;
        this.formulario.impuestosDeEntradaCiudad = detalle.ciudad.impuestosDeEntradaCiudad;
        this.formulario.productoIds = detalle.productos.map(p => p.productoId);
        this.formulario.servicioIds = detalle.servicios.map(s => s.servicioId);
        this.formulario.rutaIds = detalle.rutas.map(r => r.rutaId);

        // Mostrar como texto en inputs
        this.productoIdsTexto = this.formulario.productoIds.join(',');
        this.servicioIdsTexto = this.formulario.servicioIds.join(',');
        this.rutaIdsTexto = this.formulario.rutaIds.join(',');
      });
    }
  }

  guardarCambios(): void {
    this.formulario.productoIds = this.convertirTextoALista(this.productoIdsTexto);
    this.formulario.servicioIds = this.convertirTextoALista(this.servicioIdsTexto);
    this.formulario.rutaIds = this.convertirTextoALista(this.rutaIdsTexto);

    this.ciudadService.actualizarCiudad(this.ciudadId, this.formulario).subscribe(() => {
      this.router.navigate(['/ciudades'], {
        queryParams: { mensaje: 'Ciudad actualizada correctamente.' }
      });
    });
  }

  private convertirTextoALista(texto: string): number[] {
    return texto
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(Number);
  }
}
