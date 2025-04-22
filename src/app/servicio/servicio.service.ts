import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicioDto } from '../dto/servicio/servicio-dto';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private baseUrl = '/servicio';

  constructor(private http: HttpClient) {}

  crearServicio(servicio: ServicioDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, servicio);
  }

  verServicio(id: number): Observable<ServicioDto> {
    return this.http.get<ServicioDto>(`${this.baseUrl}/${id}`);
  }

  listarServicios(): Observable<ServicioDto[]> {
    return this.http.get<ServicioDto[]>(`${this.baseUrl}/list`);
  }

  editarServicio(id: number, servicio: ServicioDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, servicio);
  }

  eliminarServicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  verAsociaciones(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}/asociaciones`);
  }
}
