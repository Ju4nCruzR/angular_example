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
  }

  ver(id: number): void {
    this.router.navigate(['/ciudad', id]);
  }

  editar(id: number): void {
    this.router.navigate(['/ciudad', id, 'editar']);
  }

  eliminar(id: number): void {
    if (confirm('¿Eliminar esta ciudad?')) {
      this.service.eliminar(id).subscribe(() => {
        alert('Eliminada');
        this.ngOnInit(); // recarga toda la lista de ciudades
      });
    }
  }
  
  
  

  nueva(): void {
    this.router.navigate(['/ciudad/nueva']);
  }
}

