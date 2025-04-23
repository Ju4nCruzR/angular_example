import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RutaService } from '../../service/ruta.service';
import { RutaDto } from '../../model/ruta-dto';

@Component({
  standalone: true,
  selector: 'app-ruta-list',
  templateUrl: './ruta-list.component.html',
  styleUrl: './ruta-list.component.css',
  imports: [CommonModule, RouterModule]
})
export class RutaListComponent implements OnInit {
  rutas: RutaDto[] = [];

  constructor(private service: RutaService, private router: Router) {}

  ngOnInit(): void {
    this.service.listar().subscribe(data => this.rutas = data);
  }

  eliminar(id: number): void {
    if (confirm('¿Eliminar esta ruta?')) {
      this.service.eliminar(id).subscribe(() => {
        alert('Ruta eliminada');
        this.rutas = this.rutas.filter(r => r.id !== id);
      });
    }
  }

  ver(id: number): void {
    this.router.navigate(['/ruta', id]);
  }

  editar(id: number): void {
    this.router.navigate(['/ruta', id, 'editar']);
  }

  nueva(): void {
    this.router.navigate(['/ruta/nueva']);
  }
}
