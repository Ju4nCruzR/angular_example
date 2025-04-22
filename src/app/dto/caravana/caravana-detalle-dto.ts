import { CaravanaProductoDto } from './caravana-producto-dto';

export class CaravanaDetalleDto {
  id: number = 0;
  nombreCaravana: string = '';
  velocidadCaravana: number = 0;
  capacidadMaximaCargaCaravana: number = 0;
  dineroDisponibleCaravana: number = 0;
  puntosDeVidaCaravana: number = 0;
  nombreCiudadActualCaravana: string = '';
  productosCaravana: CaravanaProductoDto[] = [];
  ciudadId: number = 0;
  caravana: any;
}
