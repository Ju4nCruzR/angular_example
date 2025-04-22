import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicioDto } from '../model/servicio-dto';
import { ServicioAplicadoDto } from '../model/servicio-aplicado-dto';

@Injectable({ providedIn: 'root' })
export class ServicioService {
  private apiUrl = 'http://localhost:8080/servicio';

  constructor(private http: HttpClient) {}

  listar(): Observable<ServicioDto[]> {
    return this.http.get<ServicioDto[]>(`${this.apiUrl}/list`);
  }

  obtener(id: number): Observable<ServicioDto> {
    return this.http.get<ServicioDto>(`${this.apiUrl}/${id}`);
  }

  obtenerAsociaciones(id: number): Observable<ServicioAplicadoDto[]> {
    return this.http.get<ServicioAplicadoDto[]>(`${this.apiUrl}/${id}/asociaciones`);
  }

  crear(dto: ServicioDto): Observable<void> {
    return this.http.post<void>(this.apiUrl, dto);
  }

  actualizar(id: number, dto: ServicioDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
