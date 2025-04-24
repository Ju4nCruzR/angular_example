import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CiudadService } from '../../service/ciudad.service';
import { ProductoService } from '../../service/producto.service';
import { ServicioService } from '../../service/servicio.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CiudadFormularioDto } from '../../model/ciudad-formulario-dto';
import { FormsModule } from '@angular/forms';
import { CiudadDetalleDto } from '../../model/ciudad-detalle-dto';
import { ProductoDto } from '../../model/producto-dto';
import { ServicioDto } from '../../model/servicio-dto';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-ciudad-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './ciudad-form.component.html',
  styleUrl: './ciudad-form.component.css'
})
export class CiudadFormComponent implements OnInit {
  form: FormGroup;
  ciudad?: CiudadDetalleDto;
  editar = false;

  productosTotales: ProductoDto[] = [];
  serviciosDisponibles: ServicioDto[] = [];

  nuevoStock: { [id: number]: number } = {};
  stockNuevoProducto = 1;
  nuevoProductoId = 0;
  nuevoServicioId = 0;
  nuevaRutaId = 0;

  constructor(
    private fb: FormBuilder,
    private ciudadService: CiudadService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombreCiudad: ['', Validators.required],
      impuestosDeEntradaCiudad: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editar = true;
      this.ciudadService.getById(+id).subscribe(ciudad => {
        this.ciudad = ciudad;

        // Cargar los valores al formulario
        this.form.patchValue({
          nombreCiudad: ciudad.ciudad.nombreCiudad,
          impuestosDeEntradaCiudad: ciudad.ciudad.impuestosDeEntradaCiudad
        });
      });
    }

    this.ciudadService.obtenerProductosDisponibles().subscribe(p => this.productosTotales = p);
    this.ciudadService.obtenerServiciosDisponibles().subscribe(s => this.serviciosDisponibles = s);
  }

  guardar(): void {
    const dto: CiudadFormularioDto = this.form.value;

    if (this.editar && this.ciudad) {
      this.ciudadService.actualizarCiudad(this.ciudad.ciudad.id, dto).subscribe(() => {
        alert('Ciudad actualizada correctamente');
        this.router.navigate(['/ciudad']);
      });
    } else {
      this.ciudadService.crearCiudad(dto).subscribe(() => {
        alert('Ciudad creada correctamente');
        this.router.navigate(['/ciudad']);
      });
    }
  }

  eliminar(): void {
    if (this.ciudad) {
      this.ciudadService.eliminarCiudad(this.ciudad.ciudad.id).subscribe(() => {
        alert('Ciudad eliminada');
        this.router.navigate(['/ciudad']);
      });
    }
  }

  actualizarStock(productoId: number): void {
    this.ciudadService.actualizarStockProducto(productoId, this.nuevoStock[productoId])
    .subscribe(() => window.location.reload());  
  }

  eliminarProducto(productoId: number): void {
    this.ciudadService.eliminarProducto(this.ciudad!.ciudad.id, productoId)
      .subscribe(() => window.location.reload());
  }

  agregarProducto(): void {
    if (this.nuevoProductoId && this.stockNuevoProducto > 0) {
      this.ciudadService.agregarProducto(this.ciudad!.ciudad.id, this.nuevoProductoId, this.stockNuevoProducto)
        .subscribe(() => window.location.reload());
    }
  }

  agregarServicio(): void {
    if (this.nuevoServicioId) {
      this.ciudadService.agregarServicio(this.ciudad!.ciudad.id, this.nuevoServicioId)
        .subscribe(() => window.location.reload());
    }
  }

  eliminarServicio(servicioId: number): void {
    this.ciudadService.eliminarServicio(this.ciudad!.ciudad.id, servicioId)
      .subscribe(() => window.location.reload());
  }

  agregarRuta(): void {
    if (this.nuevaRutaId > 0) {
      this.ciudadService.agregarRuta(this.ciudad!.ciudad.id, this.nuevaRutaId)
        .subscribe(() => window.location.reload());
    }
  }

  eliminarRuta(rutaId: number): void {
    this.ciudadService.eliminarRuta(this.ciudad!.ciudad.id, rutaId)
      .subscribe(() => window.location.reload());
  }
}

