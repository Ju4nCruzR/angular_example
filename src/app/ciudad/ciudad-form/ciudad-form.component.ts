import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CiudadService } from '../ciudad.service';
import { CiudadFormularioDto } from '../../dto/ciudad/ciudad-formulario-dto';

@Component({
  selector: 'app-ciudad-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ciudad-form.component.html',
  styleUrls: ['./ciudad-form.component.css']
})
export class CiudadFormComponent {
  formulario: CiudadFormularioDto = new CiudadFormularioDto();
  productoIdsTexto: string = '';
  servicioIdsTexto: string = '';
  rutaIdsTexto: string = '';
  mensaje: string = '';

  constructor(private ciudadService: CiudadService, private router: Router) {}

  crearCiudad(): void {
    this.formulario.productoIds = this.convertirTextoALista(this.productoIdsTexto);
    this.formulario.servicioIds = this.convertirTextoALista(this.servicioIdsTexto);
    this.formulario.rutaIds = this.convertirTextoALista(this.rutaIdsTexto);

    this.ciudadService.crearCiudad(this.formulario).subscribe(() => {
      this.router.navigate(['/ciudades'], {
        queryParams: { mensaje: 'Ciudad creada exitosamente.' }
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
