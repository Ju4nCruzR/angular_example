import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoDto } from '../model/producto-dto';
import { ProductoAsociacionesDto } from '../model/producto-asociaciones-dto';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private apiUrl = 'http://localhost:8080/producto';

  constructor(private http: HttpClient) {}

  listar(): Observable<ProductoDto[]> {
    return this.http.get<ProductoDto[]>(`${this.apiUrl}/list`);
  }

  obtener(id: number): Observable<ProductoDto> {
    return this.http.get<ProductoDto>(`${this.apiUrl}/${id}`);
  }

  obtenerAsociaciones(id: number): Observable<ProductoAsociacionesDto> {
    return this.http.get<ProductoAsociacionesDto>(`${this.apiUrl}/${id}/asociaciones`);
  }

  crear(dto: ProductoDto): Observable<void> {
    return this.http.post<void>(this.apiUrl, dto);
  }

  actualizar(id: number, dto: ProductoDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
