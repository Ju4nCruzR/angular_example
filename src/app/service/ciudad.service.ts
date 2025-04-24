import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CiudadDto } from '../model/ciudad-dto';
import { CiudadFormularioDto } from '../model/ciudad-formulario-dto';
import { CiudadDetalleDto } from '../model/ciudad-detalle-dto';
import { CiudadProductoDto } from '../model/ciudad-producto-dto';
import { ProductoDto } from '../model/producto-dto';
import { ServicioDto } from '../model/servicio-dto';

@Injectable({ providedIn: 'root' })
export class CiudadService {
  private apiUrl = 'http://localhost:8080/ciudad';
  private apiProductoUrl = 'http://localhost:8080/ciudad-producto';
  private apiServicioUrl = 'http://localhost:8080/ciudad-servicio';
  private apiRutaUrl = 'http://localhost:8080/ciudad-ruta';

  constructor(private http: HttpClient) {}

  // CRUD BÁSICO

  listar(): Observable<CiudadDto[]> {
    return this.http.get<CiudadDto[]>(`${this.apiUrl}/list`);
  }

  getById(id: number): Observable<CiudadDetalleDto> {
    return this.http.get<CiudadDetalleDto>(`${this.apiUrl}/${id}`);
  }

  crearCiudad(dto: CiudadFormularioDto): Observable<void> {
    return this.http.post<void>(this.apiUrl, dto);
  }

  actualizarCiudad(id: number, dto: CiudadFormularioDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/asociaciones`, dto);
  }

  eliminarCiudad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // PRODUCTOS

  obtenerProductosDisponibles(): Observable<ProductoDto[]> {
    return this.http.get<ProductoDto[]>('http://localhost:8080/producto/list');
  }

  agregarProducto(ciudadId: number, productoId: number, stock: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${ciudadId}/producto?productoId=${productoId}&stock=${stock}`, {});
  }

  eliminarProducto(ciudadId: number, productoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiProductoUrl}/ciudad/${ciudadId}/producto/${productoId}`);
  }

  actualizarStockProducto(ciudadProductoId: number, nuevoStock: number): Observable<CiudadProductoDto> {
    return this.http.put<CiudadProductoDto>(`${this.apiProductoUrl}/${ciudadProductoId}?nuevoStock=${nuevoStock}`, {});
  }

  // SERVICIOS

  obtenerServiciosDisponibles(): Observable<ServicioDto[]> {
    return this.http.get<ServicioDto[]>('http://localhost:8080/servicio/list');
  }

  agregarServicio(ciudadId: number, servicioId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${ciudadId}/servicio?servicioId=${servicioId}`, {});
  }

  eliminarServicio(ciudadId: number, servicioId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${ciudadId}/servicio/${servicioId}/eliminar`);
  }

  marcarServicioAdquirido(ciudadServicioId: number): Observable<void> {
    return this.http.post<void>(`${this.apiServicioUrl}/${ciudadServicioId}/adquirir`, {});
  }

  // RUTAS

  agregarRuta(ciudadId: number, rutaId: number): Observable<void> {
    return this.http.post<void>(`${this.apiRutaUrl}?ciudadId=${ciudadId}&rutaId=${rutaId}`, {});
  }

  eliminarRuta(ciudadId: number, rutaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${ciudadId}/ruta/${rutaId}/eliminar`);
  }

  // DESTINOS Y STOCK EXTRA

  listarProductosDisponiblesPorCiudad(ciudadId: number): Observable<CiudadProductoDto[]> {
    return this.http.get<CiudadProductoDto[]>(`${this.apiUrl}/${ciudadId}/productos`);
  }

  obtenerStockDisponible(ciudadId: number, productoId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${ciudadId}/producto/${productoId}/stock`);
  }

  // FUNCIONES COMPLEMENTARIAS

  moverCaravana(id: number, ciudadId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/mover?ciudadId=${ciudadId}`, {});
  }

  listarDestinos(ciudadOrigenId: number): Observable<CiudadDto[]> {
    return this.http.get<CiudadDto[]>(`${this.apiUrl}/${ciudadOrigenId}/destinos`);
  }
}
