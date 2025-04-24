import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JuegoDto } from '../model/juego-dto';
import { JuegoFormularioDto } from '../model/juego-formulario-dto';
import { JuegoDetalleDto } from '../model/juego-detalle-dto';
import { JuegoResumenDto } from '../model/juego-resumen-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  private apiUrl = 'http://localhost:8080/juego';

  constructor(private http: HttpClient) {}

  listar(): Observable<JuegoResumenDto[]> {
    return this.http.get<JuegoResumenDto[]>(`${this.apiUrl}/list`);
  }

  ver(id: number): Observable<JuegoDetalleDto> {
    return this.http.get<JuegoDetalleDto>(`${this.apiUrl}/${id}`);
  }

  crear(dto: JuegoFormularioDto): Observable<void> {
    return this.http.post<void>(this.apiUrl, dto);
  }

  editar(id: number, dto: JuegoFormularioDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
