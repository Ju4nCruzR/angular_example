import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CiudadService } from '../ciudad.service';
import { CiudadServicioDto } from '../../dto/ciudad/ciudad-servicio-dto';

@Component({
  selector: 'app-ciudad-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ciudad-servicios.component.html',
  styleUrls: ['./ciudad-servicios.component.css']
})
export class CiudadServiciosComponent implements OnInit {
  ciudadId!: number;
  servicios: CiudadServicioDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private ciudadService: CiudadService
  ) {}

  ngOnInit(): void {
    this.ciudadId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.ciudadService.listarServiciosCiudad().subscribe(data => {
      this.servicios = data.filter(s => s.nombreCiudad && s.nombreCiudad.toLowerCase().includes(this.ciudadId.toString()));
    });
  }

  marcarAdquirido(servicio: CiudadServicioDto): void {
    this.ciudadService.marcarServicioAdquirido(servicio.id).subscribe(() => {
      servicio.adquirido = true;
    });
  }
}
