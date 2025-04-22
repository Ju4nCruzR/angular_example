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
    private service: CaravanaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.listar().subscribe(data => this.caravanas = data);
  }

  nuevaCaravana() {
    this.router.navigate(['/caravana/nueva']);
  }
  
  verDetalle(id: number) {
    this.router.navigate(['/caravana', id]);
  }

  editar(id: number): void {
    this.router.navigate(['/caravana', id, 'editar']);
  }

  eliminar(id: number) {
    this.service.eliminar(id).subscribe(() => {
      this.caravanas = this.caravanas.filter(c => c.id !== id);
    });
  }
}