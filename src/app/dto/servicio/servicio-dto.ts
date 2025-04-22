import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioDto {
    id: number = 0;
    tipoServicio: string = '';
    precioServicio: number = 0;
  }
  

