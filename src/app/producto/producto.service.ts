import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoDto } from '../dto/producto/producto-dto';
import { ProductoAsociacionesDto } from '../dto/producto/producto-asociaciones-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = '/producto';

  constructor(private http: HttpClient) {}

  crearProducto(producto: ProductoDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, producto);
  }

  verProducto(id: number): Observable<ProductoDto> {
    return this.http.get<ProductoDto>(`${this.baseUrl}/${id}`);
  }

  listarProductos(): Observable<ProductoDto[]> {
    return this.http.get<ProductoDto[]>(`${this.baseUrl}/list`);
  }

  editarProducto(id: number, producto: ProductoDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, producto);
  }

  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  verAsociaciones(id: number): Observable<ProductoAsociacionesDto> {
    return this.http.get<ProductoAsociacionesDto>(`${this.baseUrl}/${id}/asociaciones`);
  }
}
