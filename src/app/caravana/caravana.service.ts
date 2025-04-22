import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CaravanaDto } from './dto/caravana-dto';
import { CaravanaFormularioDto } from './dto/caravana-formulario-dto';
import { CaravanaDetalleDto } from './dto/caravana-detalle-dto';
import { CaravanaProductoDto } from './dto/caravana-producto-dto';

@Injectable({
  providedIn: 'root'
})
export class CaravanaService {
  private apiUrl = 'http://localhost:8080/caravana';

  constructor(private http: HttpClient) {}

  listarCaravanas(): Observable<CaravanaDto[]> {
    return this.http.get<CaravanaDto[]>(`${this.apiUrl}/list`);
  }

  obtenerCaravana(id: number): Observable<CaravanaDetalleDto> {
    return this.http.get<CaravanaDetalleDto>(`${this.apiUrl}/${id}`);
  }

  crearCaravana(dto: CaravanaFormularioDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, dto);
  }

  actualizarCaravana(id: number, dto: CaravanaFormularioDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/editar`, dto);
  }

  eliminarCaravana(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/eliminar`);
  }

  moverCaravana(id: number, ciudadId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/mover`, null, {
      params: new HttpParams().set('ciudadId', ciudadId.toString())
    });
  }

  comprarProducto(id: number, productoId: number, cantidad: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/comprar`, null, {
      params: new HttpParams()
        .set('productoId', productoId.toString())
        .set('cantidad', cantidad.toString())
    });
  }

  venderProducto(id: number, productoId: number, cantidad: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/vender`, null, {
      params: new HttpParams()
        .set('productoId', productoId.toString())
        .set('cantidad', cantidad.toString())
    });
  }

  aplicarServicio(id: number, servicioId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/servicio`, null, {
      params: new HttpParams().set('servicioId', servicioId.toString())
    });
  }

  agregarJugador(id: number, nombre: string, rol: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/jugadores`, null, {
      params: new HttpParams()
        .set('nombre', nombre)
        .set('rol', rol)
    });
  }

  verProductos(id: number): Observable<CaravanaProductoDto[]> {
    return this.http.get<CaravanaProductoDto[]>(`${this.apiUrl}/${id}/productos`);
  }
}
