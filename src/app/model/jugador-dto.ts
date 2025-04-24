export interface JugadorDto {
  id: number;
  nombreJugador: string;
  rolJugador: 'COMERCIANTE' | 'CARAVANERO';
  caravanaId: number;
  nombreCaravana: string;
}
