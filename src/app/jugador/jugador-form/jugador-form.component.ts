import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JugadorService } from '../jugador.service';
import { JugadorDto } from '../../dto/jugador/jugador-dto';

@Component({
  selector: 'app-jugador-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './jugador-form.component.html',
  styleUrls: ['./jugador-form.component.css']
})
export class JugadorFormComponent {
  jugador: JugadorDto = new JugadorDto();
  mensaje: string = '';

  constructor(
    private jugadorService: JugadorService,
    private router: Router
  ) {}

  crearJugador(): void {
    this.jugadorService.crearJugador(this.jugador).subscribe(() => {
      this.router.navigate(['/jugadores'], {
        queryParams: { mensaje: 'Jugador creado exitosamente.' }
      });
    });
  }
}
