import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CaravanaDetalleDto } from './dto/caravana-detalle-dto';
import { CaravanaDto } from './dto/caravana-dto';

@Injectable({
  providedIn: 'root'
})
export class CaravanaService {

  private apiUrl = '/caravana';

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

}
