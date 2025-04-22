import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CiudadDto } from '../model/ciudad-dto';
import { CiudadFormularioDto } from '../model/ciudad-formulario-dto';
import { CiudadDetalleDto } from '../model/ciudad-detalle-dto';
import { CiudadProductoDto } from '../model/ciudad-producto-dto';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CiudadService {
  private apiUrl = 'http://localhost:8080/ciudad';
  private apiProductoUrl = 'http://localhost:8080/ciudad-producto';
  private apiServicioUrl = 'http://localhost:8080/ciudad-servicio';
  private apiRutaUrl = 'http://localhost:8080/ciudad-ruta';


  constructor(private http: HttpClient) {}

  listar(): Observable<CiudadDto[]> {
    return this.http.get<CiudadDto[]>(`${this.apiUrl}/list`);
  }

  obtener(id: number): Observable<CiudadDetalleDto> {
    return this.http.get<CiudadDetalleDto>(`${this.apiUrl}/${id}`);
  }

  crear(dto: CiudadFormularioDto): Observable<void> {
    return this.http.post<void>(this.apiUrl, dto);
  }

  actualizar(id: number, dto: CiudadFormularioDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/editar`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/eliminar`);
  }
  
actualizarStockProducto(id: number, nuevoStock: number) {
  return this.http.put<CiudadProductoDto>(`http://localhost:8080/ciudad-producto/${id}?nuevoStock=${nuevoStock}`, {});
}

marcarServicioAdquirido(id: number) {
  return this.http.post<void>(`http://localhost:8080/ciudad-servicio/${id}/adquirir`, {});
}

eliminarServicio(id: number) {
  return this.http.delete<void>(`http://localhost:8080/ciudad-servicio/${id}`);
}

eliminarProductoDeCiudad(ciudadId: number, productoId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiProductoUrl}/ciudad/${ciudadId}/producto/${productoId}`);
}

crearProductoEnCiudad(ciudadId: number, productoId: number, stock: number): Observable<void> {
  return this.http.post<void>(`${this.apiProductoUrl}?ciudadId=${ciudadId}&productoId=${productoId}&stock=${stock}`, {});
}

// Eliminar ruta
eliminarRuta(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiRutaUrl}/${id}`);
}

crearRuta(ciudadId: number, rutaId: number): Observable<void> {
  return this.http.post<void>(`${this.apiRutaUrl}?ciudadId=${ciudadId}&rutaId=${rutaId}`, {});
}

}
