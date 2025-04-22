import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-caravana-servicios',
  templateUrl: './caravana-servicios.component.html'
})
export class CaravanaServiciosComponent {
  @Input() servicios: any[] = [];

  aplicar(servicioId: number) {
    console.log('Aplicar servicio ID:', servicioId);
    // caravanaService.aplicarServicio(id, servicioId)
  }
}
