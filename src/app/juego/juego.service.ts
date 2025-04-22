import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JuegoDetalleDto } from '../dto/juego/juego-detalle-dto';
import { JuegoFormularioDto } from '../dto/juego/juego-formulario-dto';
import { JuegoResumenDto } from '../dto/juego/juego-resumen-dto';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  private baseUrl = '/juego';

  constructor(private http: HttpClient) {}

  crearJuego(dto: JuegoFormularioDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, dto);
  }

  verJuego(id: number): Observable<JuegoDetalleDto> {
    return this.http.get<JuegoDetalleDto>(`${this.baseUrl}/${id}`);
  }

  listarJuegos(): Observable<JuegoResumenDto[]> {
    return this.http.get<JuegoResumenDto[]>(`${this.baseUrl}/list`);
  }

  obtenerFormulario(id: number): Observable<JuegoFormularioDto> {
    return this.http.get<JuegoFormularioDto>(`${this.baseUrl}/${id}/formulario`);
  }

  editarJuego(id: number, dto: JuegoFormularioDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dto);
  }

  eliminarJuego(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  reiniciarTiempo(id: number): Observable<JuegoDetalleDto> {
    return this.http.post<JuegoDetalleDto>(`${this.baseUrl}/${id}/reiniciar-tiempo`, {});
  }

  avanzarTiempo(id: number, minutos: number): Observable<JuegoDetalleDto> {
    return this.http.post<JuegoDetalleDto>(`${this.baseUrl}/${id}/avanzar-tiempo?minutos=${minutos}`, {});
  }

  verCaravanas(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}/caravanas`);
  }

  verJugadores(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}/jugadores`);
  }
}
