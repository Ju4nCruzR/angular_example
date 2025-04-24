import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JugadorService } from '../../service/jugador.service'; 
import { JugadorDto } from '../../model/jugador-dto'; 

@Component({
  standalone: true,
  selector: 'app-jugador-form',
  templateUrl: './jugador-form.component.html',
  styleUrls: ['./jugador-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class JugadorFormComponent implements OnInit {
  form!: FormGroup;
  jugadorId?: number;
  modoEdicion = false;

  constructor(
    private fb: FormBuilder,
    private jugadorService: JugadorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombreJugador: ['', Validators.required],
      rolJugador: ['', Validators.required],
      caravanaId: [null] // opcional
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam && this.route.snapshot.routeConfig?.path?.includes('editar')) {
      this.modoEdicion = true;
      this.jugadorId = +idParam;
      this.jugadorService.ver(this.jugadorId).subscribe(j => {
        this.form.patchValue(j);
      });
    }
  }

  guardar(): void {
    const jugador: JugadorDto = this.form.value;
    if (this.modoEdicion && this.jugadorId) {
      this.jugadorService.editar(this.jugadorId, jugador).subscribe(() => {
        alert('Jugador actualizado');
        this.router.navigate(['/jugadores']);
      });
    } else {
      this.jugadorService.crear(jugador).subscribe(() => {
        alert('Jugador creado');
        this.router.navigate(['/jugadores']);
      });
    }
  }
}
