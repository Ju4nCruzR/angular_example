import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CaravanaDetalleDto } from '../dto/caravana/caravana-detalle-dto';
import { CaravanaDto } from '../dto/caravana/caravana-dto';
// Si necesitas estos otros DTOs, puedes descomentar:
// import { CaravanaFormularioDto } from '../../dto/caravana/caravana-formulario-dto';
// import { CaravanaResumenDto } from '../../dto/caravana/caravana-resumen-dto';
// import { CaravanaCompraDto } from '../../dto/caravana/caravana-compra-dto';
// import { CaravanaVentaDto } from '../../dto/caravana/caravana-venta-dto';

@Injectable({
  providedIn: 'root'
})
export class CaravanaService {
  private apiUrl = 'http://localhost:8080/caravana'; // antes: '/caravana'

  constructor(private http: HttpClient) {}

  listarCaravanas(): Observable<CaravanaDto[]> {
    return this.http.get<CaravanaDto[]>(`${this.apiUrl}/list`);
  }

  obtenerCaravana(id: number): Observable<CaravanaDetalleDto> {
    return this.http.get<CaravanaDetalleDto>(`${this.apiUrl}/${id}`);
  }

  crearCaravana(dto: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, dto);
  }

  actualizarCaravana(id: number, dto: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/editar`, dto);
  }

  eliminarCaravana(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/eliminar`);
  }

  moverCaravana(caravanaId: number, ciudadId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${caravanaId}/mover?ciudadId=${ciudadId}`, {});
  }

  comprarProducto(caravanaId: number, productoId: number, cantidad: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${caravanaId}/comprar?productoId=${productoId}&cantidad=${cantidad}`, {});
  }

  venderProducto(caravanaId: number, productoId: number, cantidad: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${caravanaId}/vender?productoId=${productoId}&cantidad=${cantidad}`, {});
  }

  aplicarServicio(caravanaId: number, servicioId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${caravanaId}/servicio?servicioId=${servicioId}`, {});
  }

  agregarJugador(caravanaId: number, nombre: string, rol: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${caravanaId}/jugadores?nombre=${nombre}&rol=${rol}`, {});
  }

  listarProductosPorCaravana(caravanaId: number): Observable<any[]> {
    return this.http.get<any[]>(`/caravana-producto/caravana/${caravanaId}`);
  }

  obtenerProductoEnCaravana(caravanaId: number, productoId: number): Observable<any> {
    return this.http.get<any>(`/caravana-producto/caravana/${caravanaId}/producto/${productoId}`);
  }

  obtenerProductoPorId(id: number): Observable<any> {
    return this.http.get<any>(`/caravana-producto/${id}`);
  }

  crearProductoEnCaravana(caravanaId: number, productoId: number, stock: number): Observable<void> {
    return this.http.post<void>(`/caravana-producto/crear?caravanaId=${caravanaId}&productoId=${productoId}&stock=${stock}`, {});
  }

  actualizarStockProducto(id: number, nuevoStock: number): Observable<void> {
    return this.http.put<void>(`/caravana-producto/${id}/actualizar?nuevoStock=${nuevoStock}`, {});
  }

  eliminarProductoDeCaravana(id: number): Observable<void> {
    return this.http.delete<void>(`/caravana-producto/${id}/eliminar`);
  }

  listarTodosLosProductos(): Observable<any[]> {
    return this.http.get<any[]>(`/caravana-producto/list`);
  }
}
