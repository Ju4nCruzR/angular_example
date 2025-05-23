import { ServicioDto } from "./servicio-dto";

export interface CaravanaDto {
    id: number;
    nombreCaravana: string;
    velocidadCaravana: number;
    capacidadMaximaCargaCaravana: number;
    dineroDisponibleCaravana: number;
    puntosDeVidaCaravana: number;
    nombreCiudadActual: string;
    ciudadId: number;
    servicios: ServicioDto[];
  }
  