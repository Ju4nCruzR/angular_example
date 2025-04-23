import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ServicioService } from '../../service/servicio.service';
import { ServicioDto } from '../../model/servicio-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicio-form',
  standalone: true,
  templateUrl: './servicio-form.component.html',
  styleUrl: './servicio-form.component.css',
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class ServicioFormComponent implements OnInit {
  form!: FormGroup;
  editar = false;
  idServicio?: number;

  constructor(
    private fb: FormBuilder,
    private service: ServicioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tipoServicio: ['', Validators.required],
      precioServicio: [0, [Validators.required, Validators.min(0)]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editar = true;
      this.idServicio = Number(id);
      this.service.obtener(this.idServicio).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) return;

    const dto: ServicioDto = this.form.value;
    if (this.editar && this.idServicio) {
      this.service.actualizar(this.idServicio, dto).subscribe(() => {
        alert('Servicio actualizado');
        this.router.navigate(['/servicios']);
      });
    } else {
      this.service.crear(dto).subscribe(() => {
        alert('Servicio creado');
        this.router.navigate(['/servicios']);
      });
    }
  }
}
