import { CaravanaResumenDto } from '../caravana/caravana-resumen-dto';
import { JugadorResumenDto } from '../jugador/jugador-resumen-dto';

export class JuegoDetalleDto {
  id: number = 0;
  tiempoLimiteDeJuego: number = 0;
  tiempoTranscurridoDeJuego: number = 0;
  nivelMinimoGananciasJuego: number = 0;
  caravanas: CaravanaResumenDto[] = [];
  jugadores: JugadorResumenDto[] = [];
}
