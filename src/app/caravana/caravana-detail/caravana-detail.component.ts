import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CaravanaService } from '../../service/caravana.service';
import { CaravanaDetalleDto } from '../../model/caravana-detalle-dto';
import { CaravanaCompraDto } from '../../model/caravana-compra-dto';
import { CaravanaVentaDto } from '../../model/caravana-venta-dto';
import { CaravanaProductoDto } from '../../model/caravana-producto-dto';

@Component({
  selector: 'app-caravana-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './caravana-detail.component.html',
  styleUrl: './caravana-detail.component.css'
})

export class CaravanaDetailComponent implements OnInit {

  caravana!: CaravanaDetalleDto;

  productoId: number = 0;
  cantidad: number = 1;
  ciudadId: number = 0;
  servicioId: number = 0;

  productosDisponibles: CaravanaProductoDto[] = [];
  nuevoProductoId: number = 0;
  nuevoStock: number = 1;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private caravanaService: CaravanaService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
    this.caravanaService.obtener(id).subscribe({
      next: data => {
        this.caravana = data;
        this.cargarProductosDisponibles();
      },
      error: err => {
        alert("No se encontró la caravana. Serás redirigido.");
        this.router.navigate(['/caravana']);
      }
    });
  }
   

  cargarCaravana(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.caravanaService.obtener(id).subscribe((data: CaravanaDetalleDto) => {
      this.caravana = data;
    });
  }

  mover(): void {
    const id = this.caravana.caravana.id;
    this.caravanaService.moverCaravana(id, this.ciudadId).subscribe(() => {
      this.cargarCaravana();
    });
  }

  comprar(): void {
    const dto: CaravanaCompraDto = {
      caravanaId: this.caravana.caravana.id,
      productoId: this.productoId,
      cantidad: this.cantidad
    };
    this.caravanaService.comprar(dto).subscribe(() => {
      this.cargarCaravana();
    });
  }

  vender(): void {
    const dto: CaravanaVentaDto = {
      caravanaId: this.caravana.caravana.id,
      productoId: this.productoId,
      cantidad: this.cantidad
    };
    this.caravanaService.vender(dto).subscribe(() => {
      this.cargarCaravana();
    });
  }

  aplicarServicio(): void {
    const id = this.caravana.caravana.id;
    this.caravanaService.aplicarServicio(id, this.servicioId).subscribe(() => {
      this.cargarCaravana();
    });
  }

  actualizarStock(productoId: number): void {
    const producto = this.caravana.productos.find(p => p.id === productoId);
    if (producto) {
      this.caravanaService.actualizarStockProducto(producto.id, producto.stockEnCaravana).subscribe(() => {
        this.cargarCaravana();
      });
    }
  }

  cargarProductosDisponibles(): void {
    this.caravanaService.listarTodosProductos().subscribe(data => {
      if (!this.caravana || !this.caravana.productos) {
        this.productosDisponibles = data;
        return;
      }
  
      const idsYaUsados = this.caravana.productos.map(p => p.productoId);
      this.productosDisponibles = data.filter(p => !idsYaUsados.includes(p.productoId));
  
      console.log('Productos filtrados disponibles:', this.productosDisponibles);
    });
  }
  
  agregarProducto(): void {
    const caravanaId = this.caravana?.caravana?.id;
  
    if (!caravanaId || !this.nuevoProductoId || this.nuevoProductoId === 0) {
      alert('Faltan datos válidos para agregar el producto.');
      return;
    }
  
    this.caravanaService.crearProductoEnCaravana(caravanaId, this.nuevoProductoId, this.nuevoStock)
      .subscribe(() => {
        this.cargarCaravana(); // recarga productos en caravana
        this.cargarProductosDisponibles(); // actualiza el select
      });
  } 
  
  eliminarProducto(productoId: number): void {
    this.caravanaService.eliminarProducto(productoId)
      .subscribe(() => this.cargarCaravana());
  }

}