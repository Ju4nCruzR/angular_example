import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CaravanaDto } from '../../model/caravana-dto';
import { CaravanaService } from '../../service/caravana.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-caravana-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './caravana-list.component.html',
  styleUrl: './caravana-list.component.css'
})
export class CaravanaListComponent implements OnInit {

  caravanas: CaravanaDto[] = [];

  constructor(
    private caravanaService: CaravanaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCaravanas();
  }

  cargarCaravanas(): void {
    this.caravanaService.listar().subscribe((data: CaravanaDto[]) => {
      this.caravanas = data;
    });
  }

  nuevaCaravana(): void {
    this.router.navigate(['/caravana/nueva']); 
  }  

  editar(id: number): void {
    this.router.navigate([`/caravana/${id}/editar`]);
  }
  
  verDetalle(id: number): void {
    this.router.navigate([`/caravana/${id}`]); 
  } 
  

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta caravana?')) {
      this.caravanaService.eliminar(id).subscribe(() => this.cargarCaravanas());
    }
  }
}