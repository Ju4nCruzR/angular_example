import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CaravanaService } from '../../service/caravana.service';
import { CiudadService } from '../../service/ciudad.service';
import { ServicioService } from '../../service/servicio.service';
import { CaravanaDto } from '../../model/caravana-dto';
import { CaravanaDetalleDto } from '../../model/caravana-detalle-dto';
import { CaravanaCompraDto } from '../../model/caravana-compra-dto';
import { CaravanaVentaDto } from '../../model/caravana-venta-dto';
import { CaravanaProductoDto } from '../../model/caravana-producto-dto';
import { ServicioDto } from '../../model/servicio-dto';
import { ServicioAplicadoDto } from '../../model/servicio-aplicado-dto';

@Component({
  selector: 'app-caravana-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './caravana-detail.component.html',
  styleUrl: './caravana-detail.component.css'
})

export class CaravanaDetailComponent implements OnInit {

  caravanaDetalle!: CaravanaDetalleDto;
  caravana!: CaravanaDto;
  productosDisponibles: CaravanaProductoDto[] = [];
  serviciosDisponibles: ServicioDto[] = [];

  productoId: number = 0;
  cantidad: number = 1;
  ciudadId: number = 0;
  servicioId: number = 0;

  nuevoProductoId: number = 0;
  nuevoStock: number = 1;

  mensaje: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private caravanaService: CaravanaService,
    private ciudadService: CiudadService,
    private servicioService: ServicioService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
    this.caravanaService.obtener(id).subscribe({
      next: data => {
        this.caravanaDetalle = data;
        this.caravana = data.caravana;
        this.cargarProductosDisponibles();
  
        this.servicioService.listar().subscribe(servicios => {
          this.serviciosDisponibles = servicios;
        });
      },
      error: err => {
        alert("No se encontró la caravana. Serás redirigido.");
        this.router.navigate(['/caravana']);
      }
    });
  }  

  cargarCaravana(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.caravanaService.obtener(id).subscribe(data => {
      this.caravanaDetalle = data;
      this.caravana = data.caravana;
      this.cargarProductosDisponibles();
    });
  }

  cargarProductosDisponibles(): void {
    this.caravanaService.listarTodosProductos().subscribe(data => {
      const idsYaUsados = this.caravanaDetalle.productos.map(p => p.productoId);
      this.productosDisponibles = data.filter(p => !idsYaUsados.includes(p.productoId));
    });
  }

  mover(): void {
    this.caravanaService.moverCaravana(this.caravana.id, this.ciudadId).subscribe(() => {
      this.cargarCaravana();
    });
  }

  comprar(): void {
    const cantidadComprada = this.cantidad;
    const productoIdSeleccionado = this.productoId;

    const productoEnCaravana = this.caravanaDetalle.productos.find(p => p.productoId === productoIdSeleccionado);
    const nombreProducto = productoEnCaravana?.nombreProducto ?? 'producto desconocido';
    const stockAntes = productoEnCaravana?.stockEnCaravana ?? null;

    const dto: CaravanaCompraDto = {
      caravanaId: this.caravana.id,
      productoId: productoIdSeleccionado,
      cantidad: cantidadComprada
    };

    this.caravanaService.comprar(dto).subscribe({
      next: () => {
        this.cargarCaravana();

        if (stockAntes !== null) {
          const stockRestante = stockAntes + cantidadComprada;
          this.mensaje = `✅ Se compraron ${cantidadComprada} unidades de "${nombreProducto}". Ahora tienes ${stockRestante} en la caravana.`;
        } else {
          this.mensaje = `✅ Se compraron ${cantidadComprada} unidades de "${nombreProducto}".`;
        }
      },
      error: (error) => {
        this.mensaje = error?.error?.detalle
          ?? '❌ No se pudo comprar el producto. Verifica el stock disponible en la ciudad.';
      }
    });
  }


  vender(): void {
    const cantidadVendida = this.cantidad;
    const productoIdSeleccionado = this.productoId;

    const productoEnCaravana = this.caravanaDetalle.productos.find(p => p.productoId === productoIdSeleccionado);
    const nombreProducto = productoEnCaravana?.nombreProducto ?? 'producto desconocido';
    const stockAntes = productoEnCaravana?.stockEnCaravana ?? null;

    const dto: CaravanaVentaDto = {
      caravanaId: this.caravana.id,
      productoId: productoIdSeleccionado,
      cantidad: cantidadVendida
    };

    this.caravanaService.vender(dto).subscribe({
      next: () => {
        this.cargarCaravana();

        if (stockAntes !== null) {
          const stockRestante = stockAntes - cantidadVendida;
          this.mensaje = `✅ Se vendieron ${cantidadVendida} unidades de "${nombreProducto}". Ahora quedan ${stockRestante} en la caravana.`;
        } else {
          this.mensaje = `✅ Se vendieron ${cantidadVendida} unidades de "${nombreProducto}".`;
        }
      },
      error: (error) => {
        this.mensaje = error?.error?.detalle
          ?? '❌ No se pudo vender el producto. Verifica el stock disponible en la caravana.';
      }
    });
  }

  get nombreProductoSeleccionado(): string {
    const producto = this.caravanaDetalle.productos.find(p => p.productoId === this.productoId)
      ?? this.productosDisponibles.find(p => p.productoId === this.productoId);
  
    if (!producto) {
      return '❌ Producto no disponible en esta ciudad.';
    }
  
    return `✅ ${producto.nombreProducto}`;
  }
  
  get nombreServicioSeleccionado(): string {
    const servicio = this.serviciosDisponibles.find((s: ServicioDto) => s.id === this.servicioId);
  
    if (!servicio) {
      return '❌ Servicio no disponible.';
    }
  
    const yaAplicado = this.caravanaDetalle.serviciosAplicados?.some(
      (s: ServicioAplicadoDto) => s.tipoServicio === servicio.tipoServicio
    );
  
    if (yaAplicado) {
      return `⚠️ ${servicio.tipoServicio} (ya aplicado)`;
    }
  
    return `✅ ${servicio.tipoServicio}`;
  }
  
  aplicarServicio(): void {
    const servicio = this.serviciosDisponibles.find(s => s.id === this.servicioId);
  
    if (!servicio) {
      this.mensaje = '❌ Servicio no válido.';
      return;
    }
  
    const yaAplicado = this.caravanaDetalle.serviciosAplicados?.some(
      s => s.tipoServicio === servicio.tipoServicio
    );
  
    if (yaAplicado) {
      this.mensaje = `⚠️ El servicio "${servicio.tipoServicio}" ya fue aplicado.`;
      return;
    }
  
    this.caravanaService.aplicarServicio(this.caravana.id, this.servicioId).subscribe({
      next: () => {
        this.cargarCaravana();
        this.mensaje = `✅ Servicio "${servicio.tipoServicio}" aplicado correctamente.`;
      },
      error: (error) => {
        this.mensaje = error?.error?.detalle ?? '❌ No se pudo aplicar el servicio.';
      }
    });
  } 
  
  actualizarStock(productoId: number): void {
    const producto = this.caravanaDetalle.productos.find(p => p.id === productoId);
    if (producto) {
      this.caravanaService.actualizarStockProducto(producto.id, producto.stockEnCaravana)
        .subscribe(() => this.cargarCaravana());
    }
  }

  eliminarProducto(productoId: number): void {
    this.caravanaService.eliminarProducto(productoId).subscribe(() => {
      this.cargarCaravana();
    });
  }

  agregarProducto(): void {
    if (!this.nuevoProductoId || this.nuevoProductoId === 0) {
      alert("❌ Debes seleccionar un producto válido.");
      return;
    }
    this.caravanaService.crearProductoEnCaravana(
      this.caravana.id,
      this.nuevoProductoId,
      this.nuevoStock
    ).subscribe(() => {
      this.cargarCaravana();
    });
  }
}