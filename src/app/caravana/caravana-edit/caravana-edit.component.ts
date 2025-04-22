import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CaravanaService } from '../caravana.service';
import { CaravanaFormularioDto } from '../../dto/caravana/caravana-formulario-dto';

@Component({
  selector: 'app-caravana-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './caravana-edit.component.html',
  styleUrls: ['./caravana-edit.component.css'] // opcional si lo tienes
})
export class CaravanaEditComponent implements OnInit {
  caravanaId!: number;
  formulario: CaravanaFormularioDto = new CaravanaFormularioDto();

  constructor(
    private route: ActivatedRoute,
    private caravanaService: CaravanaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.caravanaId = +id;
      this.caravanaService.obtenerCaravana(this.caravanaId).subscribe(data => {
        this.formulario.nombreCaravana = data.nombre;
        this.formulario.velocidadCaravana = data.velocidad;
        this.formulario.capacidadMaximaCargaCaravana = data.capacidadMaximaCarga;
        this.formulario.dineroDisponibleCaravana = data.dineroDisponible;
        this.formulario.puntosDeVidaCaravana = data.puntosDeVida;
        this.formulario.ciudadId = data.ciudadId ?? data.ciudad?.id ?? 0;
      });
    }
  }

  actualizarCaravana(): void {
    this.caravanaService.actualizarCaravana(this.caravanaId, this.formulario).subscribe(() => {
      alert('Caravana actualizada correctamente');
      this.router.navigate(['/caravanas']);
    });
  }
}

