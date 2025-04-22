import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JugadorService } from '../jugador.service';
import { JugadorDto } from '../../dto/jugador/jugador-dto';

@Component({
  selector: 'app-jugador-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './jugador-list.component.html',
  styleUrls: ['./jugador-list.component.css']
})
export class JugadorListComponent implements OnInit {
  jugadores: JugadorDto[] = [];
  mensaje: string = '';

  constructor(
    private jugadorService: JugadorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jugadorService.listarJugadores().subscribe(data => {
      this.jugadores = data;
    });

    this.route.queryParams.subscribe(params => {
      if (params['mensaje']) {
        this.mensaje = params['mensaje'];
      }
    });
  }

  eliminarJugador(id: number): void {
    if (confirm('¿Deseas eliminar este jugador?')) {
      this.jugadorService.eliminarJugador(id).subscribe(() => {
        this.jugadores = this.jugadores.filter(j => j.id !== id);
        this.mensaje = 'Jugador eliminado correctamente.';
      });
    }
  }
}
