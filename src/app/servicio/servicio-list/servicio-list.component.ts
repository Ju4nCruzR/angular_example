import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ServicioService } from '../../service/servicio.service';
import { ServicioDto } from '../../model/servicio-dto';

@Component({
  selector: 'app-servicio-list',
  standalone: true,
  templateUrl: './servicio-list.component.html',
  styleUrls: ['./servicio-list.component.css'],
  imports: [CommonModule, RouterModule]
})
export class ServicioListComponent implements OnInit {
  servicios: ServicioDto[] = [];

  constructor(
    private service: ServicioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.listar().subscribe(data => this.servicios = data);
  }

  eliminar(id: number): void {
    if (confirm('¿Eliminar este servicio?')) {
      this.service.eliminar(id).subscribe(() => {
        alert('Servicio eliminado');
        this.servicios = this.servicios.filter(s => s.id !== id);
      });
    }
  }

  ver(id: number): void {
    this.router.navigate(['/servicio', id]);
  }

  editar(id: number): void {
    this.router.navigate(['/servicio', id, 'editar']);
  }

  nuevo(): void {
    this.router.navigate(['/servicio/nueva']);
  }
}

