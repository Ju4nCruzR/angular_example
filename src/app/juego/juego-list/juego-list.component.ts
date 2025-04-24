import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../service/juego.service'; 
import { JuegoResumenDto } from '../../model/juego-resumen-dto'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-juego-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './juego-list.component.html',
  styleUrl: './juego-list.component.css'
})
export class JuegoListComponent implements OnInit {
  juegos: JuegoResumenDto[] = [];

  constructor(
    private juegoService: JuegoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarJuegos();
  }

  cargarJuegos(): void {
    this.juegoService.listar().subscribe(juegos => {
      this.juegos = juegos;
    });
  }

  ver(id: number): void {
    this.router.navigate(['/juego', id]);
  }

  editar(id: number): void {
    this.router.navigate(['/juego', id, 'editar']);
  }

  eliminar(id: number): void {
    if (confirm('¿Deseas eliminar este juego?')) {
      this.juegoService.eliminar(id).subscribe(() => {
        alert('Juego eliminado');
        this.cargarJuegos();
      });
    }
  }

  nuevo(): void {
    this.router.navigate(['/juego', 'nuevo']);
  }
}