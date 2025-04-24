import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JugadorService } from '../../service/jugador.service'; 
import { JugadorDto } from '../../model/jugador-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jugador-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jugador-list.component.html',
  styleUrl: './jugador-list.component.css'
})
export class JugadorListComponent implements OnInit {
  jugadores: JugadorDto[] = [];

  constructor(private jugadorService: JugadorService, private router: Router) {}

  ngOnInit(): void {
    this.cargarJugadores();
  }

  cargarJugadores(): void {
    this.jugadorService.listar().subscribe(jugadores => {
      this.jugadores = jugadores;
    });
  }

  ver(id: number): void {
    this.router.navigate(['/jugador', id]);
  }

  editar(id: number): void {
    this.router.navigate(['/jugador', id, 'editar']);
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este jugador?')) {
      this.jugadorService.eliminar(id).subscribe(() => {
        alert('Jugador eliminado');
        this.cargarJugadores();
      });
    }
  }

  crear(): void {
    this.router.navigate(['/jugador', 'nuevo']);
  }
}
