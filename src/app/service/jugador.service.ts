import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JugadorDto } from '../model/jugador-dto';
import { JugadorResumenDto } from '../model/jugador-resumen-dto';

@Injectable({ providedIn: 'root' })
export class JugadorService {
  private apiUrl = 'http://localhost:8080/jugador';

  constructor(private http: HttpClient) {}

  listar(): Observable<JugadorResumenDto[]> {
    return this.http.get<JugadorResumenDto[]>(`${this.apiUrl}/list`);
  }

  obtener(id: number): Observable<JugadorDto> {
    return this.http.get<JugadorDto>(`${this.apiUrl}/${id}`);
  }

  crear(dto: JugadorDto): Observable<void> {
    return this.http.post<void>(this.apiUrl, dto);
  }

  actualizar(id: number, dto: JugadorDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
