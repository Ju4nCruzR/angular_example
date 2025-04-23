import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { JugadorService } from '../../service/jugador.service';
import { JugadorDto } from '../../model/jugador-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jugar-form',
  standalone: true,
  templateUrl: './jugar-form.component.html',
  styleUrl: './jugar-form.component.css',
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class JugarFormComponent implements OnInit {
  form!: FormGroup;
  editar = false;
  idJugador?: number;

  constructor(
    private fb: FormBuilder,
    private service: JugadorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombreJugador: ['', Validators.required],
      nivelJugador: [1, [Validators.required, Validators.min(1)]],
      experienciaJugador: [0, [Validators.required, Validators.min(0)]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editar = true;
      this.idJugador = Number(id);
      this.service.obtener(this.idJugador).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) return;

    const dto: JugadorDto = this.form.value;
    if (this.editar && this.idJugador) {
      this.service.actualizar(this.idJugador, dto).subscribe(() => {
        alert('Jugador actualizado');
        this.router.navigate(['/jugadores']);
      });
    } else {
      this.service.crear(dto).subscribe(() => {
        alert('Jugador creado');
        this.router.navigate(['/jugadores']);
      });
    }
  }
}
