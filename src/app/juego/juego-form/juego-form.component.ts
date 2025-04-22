import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JuegoFormularioDto } from '../../dto/juego/juego-formulario-dto';
import { JuegoService } from '../juego.service';

@Component({
  selector: 'app-juego-form',
  templateUrl: './juego-form.component.html',
  styleUrls: ['./juego-form.component.css']
})
export class JuegoFormComponent {
  formulario: JuegoFormularioDto = new JuegoFormularioDto();
  caravanaIdsTexto: string = '';
  mensaje: string = '';

  constructor(
    private juegoService: JuegoService,
    private router: Router
  ) {}

  crearJuego(): void {
    this.formulario.caravanaIds = this.caravanaIdsTexto
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(Number);

    this.juegoService.crearJuego(this.formulario).subscribe(() => {
      this.router.navigate(['/juegos'], {
        queryParams: { mensaje: 'Juego creado exitosamente.' }
      });
    });
  }
}
