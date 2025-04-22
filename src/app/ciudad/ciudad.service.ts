import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CiudadDto {
  id: number;
  nombreCiudad: string;
  impuestosDeEntradaCiudad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  private baseUrl = '/ciudad';
  private productoUrl = '/ciudad-producto';
  private servicioUrl = '/ciudad-servicio';
  private rutaUrl = '/ciudad-ruta';

  constructor(private http: HttpClient) {}

  // ----- Ciudad principal -----
  crearCiudad(dto: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, dto);
  }

  verCiudad(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  listarCiudades(): Observable<CiudadDto[]> {
    return this.http.get<CiudadDto[]>(`${this.baseUrl}/list`);
  }

  actualizarCiudad(id: number, dto: any): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/editar`, dto);
  }

  eliminarCiudad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/eliminar`);
  }

  // ----- CiudadProducto -----
  listarProductosPorCiudad(ciudadId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.productoUrl}/ciudad/${ciudadId}`);
  }

  verProductoCiudad(ciudadId: number, productoId: number): Observable<any> {
    return this.http.get<any>(`${this.productoUrl}/ciudad/${ciudadId}/producto/${productoId}`);
  }

  obtenerProductoCiudadPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.productoUrl}/${id}`);
  }

  crearProductoCiudad(ciudadId: number, productoId: number, stock: number): Observable<void> {
    return this.http.post<void>(`${this.productoUrl}?ciudadId=${ciudadId}&productoId=${productoId}&stock=${stock}`, {});
  }

  actualizarStockProductoCiudad(id: number, nuevoStock: number): Observable<any> {
    return this.http.put<any>(`${this.productoUrl}/${id}?nuevoStock=${nuevoStock}`, {});
  }

  eliminarProductoCiudad(ciudadId: number, productoId: number): Observable<void> {
    return this.http.delete<void>(`${this.productoUrl}/ciudad/${ciudadId}/producto/${productoId}`);
  }

  listarTodosProductosCiudad(): Observable<any[]> {
    return this.http.get<any[]>(`${this.productoUrl}/list`);
  }

  // ----- CiudadServicio -----
  listarServiciosCiudad(): Observable<any[]> {
    return this.http.get<any[]>(`${this.servicioUrl}/list`);
  }

  verServicioCiudad(id: number): Observable<any> {
    return this.http.get<any>(`${this.servicioUrl}/${id}`);
  }

  asociarServicioCiudad(ciudadId: number, servicioId: number): Observable<void> {
    return this.http.post<void>(`${this.servicioUrl}?ciudadId=${ciudadId}&servicioId=${servicioId}`, {});
  }

  marcarServicioAdquirido(id: number): Observable<void> {
    return this.http.post<void>(`${this.servicioUrl}/${id}/adquirir`, {});
  }

  eliminarServicioCiudad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.servicioUrl}/${id}`);
  }

  // ----- CiudadRuta -----
  listarRutasCiudad(): Observable<any[]> {
    return this.http.get<any[]>(`${this.rutaUrl}/list`);
  }

  verRutaCiudad(id: number): Observable<any> {
    return this.http.get<any>(`${this.rutaUrl}/${id}`);
  }

  asociarRutaCiudad(ciudadId: number, rutaId: number): Observable<void> {
    return this.http.post<void>(`${this.rutaUrl}?ciudadId=${ciudadId}&rutaId=${rutaId}`, {});
  }

  eliminarRutaCiudad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.rutaUrl}/${id}`);
  }
}
