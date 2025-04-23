export interface RutaDto {
    id: number;
    ciudadOrigenId: number;
    nombreCiudadOrigen: string;
    ciudadDestinoId: number;
    nombreCiudadDestino: string;
    distanciaRuta: number;
    segura: boolean;
  }
  