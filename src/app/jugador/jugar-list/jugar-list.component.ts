import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { JugadorService } from '../../service/jugador.service';
import { JugadorResumenDto } from '../../model/jugador-resumen-dto';

@Component({
  standalone: true,
  selector: 'app-jugar-list',
  templateUrl: './jugar-list.component.html',
  imports: [CommonModule, RouterModule]
})
export class JugarListComponent implements OnInit {
  jugadores: JugadorResumenDto[] = [];

  constructor(private service: JugadorService, private router: Router) {}

  ngOnInit(): void {
    this.service.listar().subscribe(data => this.jugadores = data);
  }

  eliminar(id: number): void {
    if (confirm('¿Eliminar este jugador?')) {
      this.service.eliminar(id).subscribe(() => {
        alert('Jugador eliminado');
        this.jugadores = this.jugadores.filter(j => j.id !== id);
      });
    }
  }

  ver(id: number): void {
    this.router.navigate(['/jugador', id]);
  }

  editar(id: number): void {
    this.router.navigate(['/jugador', id, 'editar']);
  }

  nuevo(): void {
    this.router.navigate(['/jugador/nueva']);
  }
}

