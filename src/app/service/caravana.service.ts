import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CaravanaDto } from '../model/caravana-dto';
import { CaravanaVentaDto } from '../model/caravana-venta-dto';
import { CaravanaCompraDto } from '../model/caravana-compra-dto';
import { CaravanaFormularioDto } from '../model/caravana-formulario-dto';
import { CaravanaDetalleDto } from '../model/caravana-detalle-dto';
import { CaravanaProductoDto } from '../model/caravana-producto-dto';


@Injectable({ providedIn: 'root' })
export class CaravanaService {
  private apiUrl = 'http://localhost:8080/caravana';
  private apiProductoUrl = 'http://localhost:8080/caravana-producto';

  constructor(private http: HttpClient) {}

  // Caravana Endpoints
  listar(): Observable<CaravanaDto[]> {
    return this.http.get<CaravanaDto[]>(`${this.apiUrl}/list`);
  }

  obtener(id: number): Observable<CaravanaDetalleDto> {
    return this.http.get<CaravanaDetalleDto>(`${this.apiUrl}/${id}`);
  }

  crear(form: CaravanaFormularioDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, form);
  }

  actualizar(id: number, form: CaravanaFormularioDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/editar`, form);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/eliminar`);
  }

  moverCaravana(id: number, ciudadId: number): Observable<CaravanaDto> {
    return this.http.post<CaravanaDto>(`${this.apiUrl}/${id}/mover?ciudadId=${ciudadId}`, {});
  }
  
  comprar(dto: CaravanaCompraDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${dto.caravanaId}/comprar?productoId=${dto.productoId}&cantidad=${dto.cantidad}`, {});
  }

  vender(dto: CaravanaVentaDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${dto.caravanaId}/vender?productoId=${dto.productoId}&cantidad=${dto.cantidad}`, {});
  }

  aplicarServicio(id: number, servicioId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/servicio?servicioId=${servicioId}`, {});
  }

  // CaravanaProducto Endpoints
  listarProductosPorCaravana(caravanaId: number): Observable<CaravanaProductoDto[]> {
    return this.http.get<CaravanaProductoDto[]>(`${this.apiProductoUrl}/caravana/${caravanaId}`);
  }

  obtenerProductoPorCaravana(caravanaId: number, productoId: number): Observable<CaravanaProductoDto> {
    return this.http.get<CaravanaProductoDto>(`${this.apiProductoUrl}/caravana/${caravanaId}/producto/${productoId}`);
  }

  actualizarStockProducto(id: number, nuevoStock: number): Observable<CaravanaProductoDto> {
    return this.http.put<CaravanaProductoDto>(`${this.apiProductoUrl}/${id}/actualizar?nuevoStock=${nuevoStock}`, {});
  }

  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiProductoUrl}/${id}/eliminar`);
  }

  crearProductoEnCaravana(caravanaId: number, productoId: number, stock: number): Observable<void> {
    return this.http.post<void>(`${this.apiProductoUrl}/crear?caravanaId=${caravanaId}&productoId=${productoId}&stock=${stock}`, {});
  }

  eliminarProductoDeCaravana(caravanaId: number, productoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiProductoUrl}/${caravanaId}/producto/${productoId}/eliminar`);
  }  

  listarTodosProductos(): Observable<CaravanaProductoDto[]> {
    return this.http.get<CaravanaProductoDto[]>(`${this.apiProductoUrl}/list`);
  }
}
