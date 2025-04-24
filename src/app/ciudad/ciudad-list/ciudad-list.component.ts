import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CiudadDto } from '../../model/ciudad-dto';
import { CiudadService } from '../../service/ciudad.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-ciudad-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ciudad-list.component.html',
  styleUrl: './ciudad-list.component.css'
})
export class CiudadListComponent implements OnInit {
  ciudades: CiudadDto[] = [];

  constructor(private service: CiudadService, private router: Router) {}

  ngOnInit(): void {
    this.service.listar().subscribe(data => this.ciudades = data);
    this.cargarCiudades();
  }

  ver(id: number): void {
    this.router.navigate(['/ciudad', id]);
  }

  editar(id: number): void {
    this.router.navigate(['/ciudad', id, 'editar']);
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta ciudad?')) {
      this.service.eliminarCiudad(id).subscribe({
        next: () => {
          console.log('✅ Ciudad eliminada correctamente.');
          this.cargarCiudades();
        },
        error: (error) => {
          console.error('❌ Error al eliminar ciudad:', error);
        }
      });
    }
  }
  
  nueva(): void {
    this.router.navigate(['/ciudad/nueva']);
  }

  cargarCiudades(): void {
    this.service.listar().subscribe(data => {
      this.ciudades = data;
    });
  }
  
}

