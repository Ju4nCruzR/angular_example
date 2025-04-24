import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CiudadDetalleDto } from '../../model/ciudad-detalle-dto';
import { CiudadService } from '../../service/ciudad.service';
import { ProductoService } from '../../service/producto.service';
import { ServicioService } from '../../service/servicio.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoDto } from '../../model/producto-dto';
import { ServicioDto } from '../../model/servicio-dto';

@Component({
  selector: 'app-ciudad-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './ciudad-detail.component.html',
  styleUrl: './ciudad-detail.component.css'
})
export class CiudadDetailComponent implements OnInit {
  ciudad!: CiudadDetalleDto;
  ciudadId!: number;
  productosTotales: ProductoDto[] = [];
  serviciosDisponibles: ServicioDto[] = [];
  serviciosParaAgregar: ServicioDto[] = [];
  nuevoServicioId: number = 0;


  constructor(private route: ActivatedRoute, private service: CiudadService,
     private productoService: ProductoService, private servicioService: ServicioService, private ciudadService: CiudadService  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ciudadId = id;
  
    this.ciudadService.getById(id).subscribe((data: CiudadDetalleDto) => {
      this.ciudad = data;
      console.log('📦 Ciudad cargada:', data);

    });
    
    this.productoService.listar().subscribe(productos => {
      this.productosTotales = productos;
      console.log('🛒 Productos totales:', productos);
    });
  
    this.servicioService.listarServiciosDisponiblesParaCiudad(id).subscribe(servicios => {
      this.serviciosDisponibles = servicios;
      console.log('🛎 Servicios disponibles para agregar:', servicios);
    });
  }
  

  nuevoStock: { [productoId: number]: number } = {};

  actualizarStock(id: number): void {
    const stock = this.nuevoStock[id];
    if (stock != null) {
      this.service.actualizarStockProducto(id, stock).subscribe(() => {
        alert('Stock actualizado');
        this.ngOnInit(); // recarga datos
      });
    }
  }

  adquirirServicio(id: number): void {
    this.service.marcarServicioAdquirido(id).subscribe(() => {
      alert('Servicio marcado como adquirido');
      this.ngOnInit();
    });
  }

  eliminarServicio(servicioId: number): void {
    this.service.eliminarServicio(this.ciudad.ciudad.id, servicioId).subscribe(() => {
      this.cargarCiudad();
      });
  }
  nuevoProductoId = 0;
  stockNuevoProducto = 1;

  nuevaRutaId = 0;

  agregarProducto(): void {
    const idCiudad = this.ciudad.ciudad.id;
    this.service.agregarProducto(idCiudad, this.nuevoProductoId, this.stockNuevoProducto).subscribe(() => {
      alert('Producto agregado');
      this.ngOnInit();
    });
  }

  eliminarProducto(productoId: number): void {
    const idCiudad = this.ciudad.ciudad.id;
    this.service.eliminarProducto(idCiudad, productoId).subscribe(() => {
      alert('Producto eliminado');
      this.ngOnInit();
    });
  }

  agregarRuta(): void {
    const idCiudad = this.ciudad.ciudad.id;
    this.service.agregarRuta(idCiudad, this.nuevaRutaId).subscribe(() => {
      alert('Ruta agregada');
      this.ngOnInit();
    });
  }

  eliminarRuta(rutaId: number): void {
    this.service.eliminarRuta(this.ciudad.ciudad.id, rutaId).subscribe(() => {
      this.cargarCiudad();
    });
  }

  cargarCiudad(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getById(id).subscribe(data => this.ciudad = data);
  }  

  agregarServicio(): void {
    if (!this.nuevoServicioId || this.nuevoServicioId === 0) {
      alert('❌ Debes seleccionar un servicio válido.');
      return;
    }
  
    this.service.agregarServicio(this.ciudad.ciudad.id, this.nuevoServicioId).subscribe({
      next: () => {
        this.cargarCiudad();  // Recargar para ver el servicio agregado
        this.nuevoServicioId = 0;
      },
      error: () => {
        alert('❌ No se pudo agregar el servicio. Intenta de nuevo.');
      }
    });
  }  
  
}

