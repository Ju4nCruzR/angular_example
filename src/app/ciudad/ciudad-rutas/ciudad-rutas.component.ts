import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CiudadService } from '../ciudad.service';
import { CiudadRutaDto } from '../../dto/ciudad/ciudad-ruta-dto';

@Component({
  selector: 'app-ciudad-rutas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ciudad-rutas.component.html',
  styleUrls: ['./ciudad-rutas.component.css']
})
export class CiudadRutasComponent implements OnInit {
  ciudadId!: number;
  rutas: CiudadRutaDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private ciudadService: CiudadService
  ) {}

  ngOnInit(): void {
    this.ciudadId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarRutas();
  }

  cargarRutas(): void {
    this.ciudadService.listarRutasCiudad().subscribe(data => {
      this.rutas = data.filter(r => r.ciudadNombre && r.ciudadNombre.toLowerCase().includes(this.ciudadId.toString()));
    });
  }

  eliminarRuta(ruta: CiudadRutaDto): void {
    if (confirm(`¿Eliminar ruta hacia ${ruta.destinoNombre}?`)) {
      this.ciudadService.eliminarRutaCiudad(ruta.id).subscribe(() => {
        this.rutas = this.rutas.filter(r => r.id !== ruta.id);
      });
    }
  }
}
