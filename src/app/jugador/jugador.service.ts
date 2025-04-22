import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JugadorDto } from '../dto/jugador/jugador-dto';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  private baseUrl = '/jugador';

  constructor(private http: HttpClient) {}

  crearJugador(jugador: JugadorDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, jugador);
  }

  verJugador(id: number): Observable<JugadorDto> {
    return this.http.get<JugadorDto>(`${this.baseUrl}/${id}`);
  }

  listarJugadores(): Observable<JugadorDto[]> {
    return this.http.get<JugadorDto[]>(`${this.baseUrl}/list`);
  }

  editarJugador(id: number, jugador: JugadorDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, jugador);
  }

  eliminarJugador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
