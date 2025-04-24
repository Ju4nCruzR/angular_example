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
import { CiudadDto } from '../../model/ciudad-dto';
import { CiudadProductoDto } from '../../model/ciudad-producto-dto';


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
  ciudadesDisponibles: CiudadDto[] = [];
  productosEnCiudadActual: CiudadProductoDto[] = [];
  productosEnCaravana: CaravanaProductoDto[] = [];

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
    console.log('🟠 ngOnInit cargado');
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.caravanaService.obtener(id).subscribe({
      next: data => {
        console.log('📦 Datos completos de la caravana recibida:', data);
        this.caravanaDetalle = data;
        this.caravana = data.caravana;

        const ciudadIdActual = data.caravana.ciudadId;
        console.log('🟡 ciudadIdActual:', ciudadIdActual);

        const caravanaId = data.caravana.id;


        // ✅ Productos disponibles para comprar (de la ciudad actual)
        if (ciudadIdActual != null) {
          this.ciudadService.listarProductosDisponiblesPorCiudad(ciudadIdActual).subscribe(
            (productos: CiudadProductoDto[]) => {
              console.log('🟢 Productos en ciudad actual recibidos:', productos);
              this.productosEnCiudadActual = productos;
            }
          );
        }

        // ✅ Productos disponibles para vender (que están en la caravana)
        if (caravanaId != null) {
          this.caravanaService.listarProductosPorCaravana(caravanaId).subscribe(
            (productos: CaravanaProductoDto[]) => {
              this.productosEnCaravana = productos;
            }
          );
        }

        // Servicios
        this.servicioService.listar().subscribe((servicios: ServicioDto[]) => {
          this.serviciosDisponibles = servicios;
        });

        // Ciudades
        this.ciudadService.listarDestinos(ciudadIdActual).subscribe((ciudades: CiudadDto[]) => {
          this.ciudadesDisponibles = ciudades;
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
    console.log('🌍 ciudadId seleccionada para mover:', this.ciudadId);
    this.caravanaService.moverCaravana(this.caravana.id, this.ciudadId).subscribe((dto) => {
      this.caravana.nombreCiudadActual = dto.nombreCiudadActual; // para mostrarlo en pantalla
      this.cargarCaravana(); // para refrescar productos, rutas, etc.
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

  servicioYaAplicado(servicio: ServicioDto): boolean {
    return this.caravanaDetalle.serviciosAplicados?.some(
      s => s.tipoServicio === servicio.tipoServicio
    );
  }

  aplicarServicioDesdeLista(servicioId: number): void {
    this.servicioId = servicioId;
    this.aplicarServicio();
  }
  
}