import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioDto } from '../../model/servicio-dto';
import { ServicioAplicadoDto } from '../../model/servicio-aplicado-dto';
import { ServicioService } from '../../service/servicio.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-servicio-detail',
  standalone: true,
  templateUrl: './servicio-detail.component.html',
  styleUrl: './servicio-detail.component.css',
  imports: [CommonModule, RouterModule]
})
export class ServicioDetailComponent implements OnInit {
  servicio!: ServicioDto;
  asociaciones: ServicioAplicadoDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: ServicioService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.obtener(id).subscribe(data => this.servicio = data);
    this.service.obtenerAsociaciones(id).subscribe(data => this.asociaciones = data);
  }
}

