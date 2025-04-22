import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CiudadService } from '../../service/ciudad.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ciudad-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './ciudad-form.component.html',
  styleUrl: './ciudad-form.component.css'
})
export class CiudadFormComponent implements OnInit {
  form!: FormGroup;
  editar = false;
  idCiudad?: number;

  constructor(
    private fb: FormBuilder,
    private service: CiudadService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombreCiudad: [''],
      impuestosDeEntradaCiudad: [0],
      productoIds: [[]],
      servicioIds: [[]],
      rutaIds: [[]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editar = true;
      this.idCiudad = Number(id);
      this.service.obtener(this.idCiudad).subscribe(data => {
        this.form.patchValue({
          nombreCiudad: data.ciudad.nombreCiudad,
          impuestosDeEntradaCiudad: data.ciudad.impuestosDeEntradaCiudad,
          productoIds: data.productos.map(p => p.productoId),
          servicioIds: data.servicios.map(s => s.servicioId),
          rutaIds: data.rutas.map(r => r.rutaId)
        });
      });
    }
  }

  guardar(): void {
    if (this.editar && this.idCiudad) {
      this.service.actualizar(this.idCiudad, this.form.value).subscribe(() => this.router.navigate(['/ciudades']));
    } else {
      this.service.crear(this.form.value).subscribe(() => this.router.navigate(['/ciudades']));
    }
  }

  toNumberArray(input: string): number[] {
    return input.split(',').map(v => Number(v.trim()));
  }
}
