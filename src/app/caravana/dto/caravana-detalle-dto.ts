import { CaravanaProductoDto } from './caravana-producto-dto';

export class CaravanaDetalleDto {
  id: number = 0;
  nombre: string = '';
  velocidad: number = 0;
  capacidadMaximaCarga: number = 0;
  dineroDisponible: number = 0;
  puntosDeVida: number = 0;
  nombreCiudadActual: string = '';
  productos: CaravanaProductoDto[] = [];
}
