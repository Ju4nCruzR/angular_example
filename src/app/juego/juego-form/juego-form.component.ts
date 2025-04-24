import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JuegoService } from '../../service/juego.service'; 
import { JuegoFormularioDto } from '../../model/juego-formulario-dto'; 
import { CaravanaService } from '../../service/caravana.service';
import { CaravanaDto } from '../../model/caravana-dto'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-juego-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './juego-form.component.html',
  styleUrl: './juego-form.component.css'
})
export class JuegoFormComponent implements OnInit {
  form!: FormGroup;
  juegoId?: number;
  modoEdicion = false;
  caravanasDisponibles: CaravanaDto[] = [];

  constructor(
    private fb: FormBuilder,
    private juegoService: JuegoService,
    private caravanaService: CaravanaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tiempoLimiteDeJuego: [60, Validators.required],
      tiempoTranscurridoDeJuego: [0, Validators.required],
      nivelMinimoGananciasJuego: [100, Validators.required],
      caravanaIds: this.fb.array([])
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam && this.route.snapshot.routeConfig?.path?.includes('editar')) {
      this.modoEdicion = true;
      this.juegoId = +idParam;
      this.juegoService.ver(this.juegoId).subscribe(data => {
        this.form.patchValue({
          tiempoLimiteDeJuego: data.tiempoLimiteDeJuego,
          tiempoTranscurridoDeJuego: data.tiempoTranscurridoDeJuego,
          nivelMinimoGananciasJuego: data.nivelMinimoGananciasJuego
        });
        const ids = data.caravanas.map(c => c.id);
        this.form.setControl('caravanaIds', this.fb.array(ids));
      });
    }

    this.caravanaService.listar().subscribe(caravanas => {
      this.caravanasDisponibles = caravanas;
    });
  }

  guardar(): void {
    const dto: JuegoFormularioDto = this.form.value;
    if (this.modoEdicion && this.juegoId) {
      this.juegoService.editar(this.juegoId, dto).subscribe(() => {
        alert('Juego actualizado');
        this.router.navigate(['/juegos']);
      });
    } else {
      this.juegoService.crear(dto).subscribe(() => {
        alert('Juego creado');
        this.router.navigate(['/juegos']);
      });
    }
  }

  toggleCaravana(id: number): void {
    const control = this.form.get('caravanaIds') as FormArray;
    const index = control.value.indexOf(id);
    if (index === -1) {
      control.push(this.fb.control(id));
    } else {
      control.removeAt(index);
    }
  }

  isSeleccionada(id: number): boolean {
    const control = this.form.get('caravanaIds') as FormArray;
    return control.value.includes(id);
  }
}
