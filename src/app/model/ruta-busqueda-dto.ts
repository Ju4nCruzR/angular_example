import { RutaDto } from './ruta-dto';

export interface RutaBusquedaDto {
  rutasPorOrigen: RutaDto[];
  rutasPorDestino: RutaDto[];
  rutasSeguras: RutaDto[];
  rutasEntreCiudades: RutaDto[];
}
