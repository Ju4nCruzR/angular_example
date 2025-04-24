import { CaravanaResumenDto } from './caravana-resumen-dto';
import { JugadorDto } from './jugador-dto';

export interface JuegoDetalleDto {
  id: number;
  tiempoLimiteDeJuego: number;
  tiempoTranscurridoDeJuego: number;
  nivelMinimoGananciasJuego: number;
  caravanas: CaravanaResumenDto[];
  jugadores: JugadorDto[];
}
