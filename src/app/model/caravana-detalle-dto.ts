import { CaravanaDto } from "./caravana-dto";
import { CaravanaProductoDto } from "./caravana-producto-dto";
import { JugadorDto } from "./jugador-dto";
import { ServicioAplicadoDto } from "./servicio-aplicado-dto";

export interface CaravanaDetalleDto {
  caravana: CaravanaDto;
  productos: CaravanaProductoDto[];
  jugadores: JugadorDto[];
  rutasRecorridas: string[];
  serviciosAplicados: ServicioAplicadoDto[];
}