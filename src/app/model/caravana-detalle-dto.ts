import { CaravanaDto } from "./caravana-dto";
import { CaravanaProductoDto } from "./caravana-producto-dto";

export interface CaravanaDetalleDto {
  caravana: CaravanaDto;
  productos: CaravanaProductoDto[];
  jugadores: JugadorDto[];
  rutasRecorridas: string[];
}

export interface JugadorDto {
  id: number;
  nombreJugador: string;
  rolJugador: string;
}
