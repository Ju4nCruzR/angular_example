import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RutaService } from '../../service/ruta.service';
import { RutaDto } from '../../model/ruta-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ruta-form',
  standalone: true,
  templateUrl: './ruta-form.component.html',
  styleUrl: './ruta-form.component.css',
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class RutaFormComponent implements OnInit {
  form!: FormGroup;
  editar = false;
  idRuta?: number;

  constructor(
    private fb: FormBuilder,
    private service: RutaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      ciudadOrigenId: [null, Validators.required],
      ciudadDestinoId: [null, Validators.required],
      distanciaRuta: [0, [Validators.required, Validators.min(0)]],
      segura: [false, Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editar = true;
      this.idRuta = Number(id);
      this.service.obtener(this.idRuta).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) return;

    const dto: RutaDto = this.form.value;
    if (this.editar && this.idRuta) {
      this.service.actualizar(this.idRuta, dto).subscribe(() => {
        alert('Ruta actualizada');
        this.router.navigate(['/rutas']);
      });
    } else {
      this.service.crear(dto).subscribe(() => {
        alert('Ruta creada');
        this.router.navigate(['/rutas']);
      });
    }
  }
}

