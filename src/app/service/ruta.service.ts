import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RutaDto } from '../model/ruta-dto';
import { RutaBusquedaDto } from '../model/ruta-busqueda-dto';

@Injectable({ providedIn: 'root' })
export class RutaService {
  private apiUrl = 'http://localhost:8080/ruta';

  constructor(private http: HttpClient) {}

  listar(): Observable<RutaDto[]> {
    return this.http.get<RutaDto[]>(`${this.apiUrl}/list`);
  }

  obtener(id: number): Observable<RutaDto> {
    return this.http.get<RutaDto>(`${this.apiUrl}/${id}`);
  }

  crear(dto: RutaDto): Observable<void> {
    return this.http.post<void>(this.apiUrl, dto);
  }

  actualizar(id: number, dto: RutaDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarRutas(ciudadOrigenId: number, ciudadDestinoId: number, segura: boolean): Observable<RutaBusquedaDto> {
    return this.http.get<RutaBusquedaDto>(
      `${this.apiUrl}/entre-ciudades?ciudadOrigenId=${ciudadOrigenId}&ciudadDestinoId=${ciudadDestinoId}&segura=${segura}`
    );
  }
}
