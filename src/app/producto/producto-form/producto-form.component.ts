import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductoService } from '../../service/producto.service';
import { ProductoDto } from '../../model/producto-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent implements OnInit {
  form!: FormGroup;
  editar = false;
  idProducto?: number;

  constructor(
    private fb: FormBuilder,
    private service: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombreProducto: ['', Validators.required],
      factorDemandaProducto: [0, [Validators.required, Validators.min(0)]],
      factorOfertaProducto: [0, [Validators.required, Validators.min(0)]],
      precioBaseProducto: [0, [Validators.required, Validators.min(0)]],
      pesoProducto: [0, [Validators.required, Validators.min(0)]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editar = true;
      this.idProducto = Number(id);
      this.service.obtener(this.idProducto).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) return;

    const dto: ProductoDto = this.form.value;
    if (this.editar && this.idProducto) {
      this.service.actualizar(this.idProducto, dto).subscribe(() => {
        alert('Producto actualizado');
        this.router.navigate(['/productos']);
      });
    } else {
      this.service.crear(dto).subscribe(() => {
        alert('Producto creado');
        this.router.navigate(['/productos']);
      });
    }
  }
}
