import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'
import { CaravanaService } from '../../service/caravana.service';
import { CaravanaFormularioDto } from '../../model/caravana-formulario-dto';
import { CaravanaProductoDto } from '../../model/caravana-producto-dto';


@Component({
  selector: 'app-caravana-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './caravana-form.component.html',
  styleUrl: './caravana-form.component.css'
})
export class CaravanaFormComponent implements OnInit {

  form!: FormGroup;
  editar: boolean = false;
  caravanaId!: number;
  caravanaOriginal!: CaravanaFormularioDto;

  productosDisponibles: CaravanaProductoDto[] = [];
  productosParaAgregar: CaravanaProductoDto[] = [];
  productosEnCaravana: CaravanaProductoDto[] = [];

  nuevoProductoId: number = 0;
  nuevoStock: number = 1;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private caravanaService: CaravanaService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombreCaravana: ['', Validators.required],
      velocidadCaravana: [0, Validators.required],
      capacidadMaximaCargaCaravana: [0, Validators.required],
      dineroDisponibleCaravana: [0, Validators.required],
      puntosDeVidaCaravana: [0, Validators.required],
      ciudadId: [0, Validators.required]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editar = true;
      this.caravanaId = Number(idParam);

      this.caravanaService.obtener(this.caravanaId).subscribe((data) => {
        this.form.patchValue({
          nombreCaravana: data.caravana.nombreCaravana,
          velocidadCaravana: data.caravana.velocidadCaravana,
          capacidadMaximaCargaCaravana: data.caravana.capacidadMaximaCargaCaravana,
          dineroDisponibleCaravana: data.caravana.dineroDisponibleCaravana,
          puntosDeVidaCaravana: data.caravana.puntosDeVidaCaravana,
          ciudadId: data.caravana.ciudadId
        });

        this.caravanaOriginal = {
          nombreCaravana: data.caravana.nombreCaravana,
          velocidadCaravana: data.caravana.velocidadCaravana,
          capacidadMaximaCargaCaravana: data.caravana.capacidadMaximaCargaCaravana,
          dineroDisponibleCaravana: data.caravana.dineroDisponibleCaravana,
          puntosDeVidaCaravana: data.caravana.puntosDeVidaCaravana,
          ciudadId: data.caravana.ciudadId
        };

        this.cargarProductos(); // solo se hace en edición
      });
    }
  }

  guardar(): void {
    const dto: CaravanaFormularioDto = this.form.value;

    if (this.editar) {
      const actualizada = {
        ...this.caravanaOriginal,
        ...dto
      };

      this.caravanaService.actualizar(this.caravanaId!, actualizada).subscribe(() => {
        this.router.navigate(['/caravanas']);
      });
    } else {
      this.caravanaService.crear(dto).subscribe(() => {
        this.router.navigate(['/caravanas']);
      });
    }
  }

  eliminar(): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta caravana?')) {
      this.caravanaService.eliminar(this.caravanaId!).subscribe(() => {
        this.router.navigate(['/caravanas']);
      });
    }
  }

  cargarProductos(): void {
    this.caravanaService.listarTodosProductos().subscribe(data => {
      this.productosParaAgregar = data;
    });
  
    if (this.caravanaId) {
      this.caravanaService.listarProductosPorCaravana(this.caravanaId).subscribe(data => {
        this.productosEnCaravana = data;
      });
    }
  }    

  agregarProducto(): void {
    if (this.caravanaId && this.nuevoProductoId && this.nuevoStock > 0) {
      this.caravanaService.crearProductoEnCaravana(this.caravanaId, this.nuevoProductoId, this.nuevoStock)
        .subscribe(() => {
          alert("Producto agregado a la caravana.");
        });
    }
  }

  eliminarProducto(productoId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto de la caravana?')) {
      this.caravanaService.eliminarProductoDeCaravana(this.caravanaId, productoId).subscribe(() => {
        alert('Producto eliminado correctamente.');
        this.cargarProductos(); // 🔁 vuelve a cargar las listas actualizadas
      });
    }
  }  

}