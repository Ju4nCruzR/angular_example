export class CaravanaDto {
    constructor(
        public id: number,
        public nombreCaravana: string,
        public velocidadCaravana: number,
        public capacidadMaximaCargaCaravana: number,
        public dineroDisponibleCaravana: number,
        public puntosDeVidaCaravana: number,
        public nombreCiudadActual: string
    ) {}
}
