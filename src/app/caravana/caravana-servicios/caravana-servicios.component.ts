import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-caravana-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './caravana-servicios.component.html'
})
export class CaravanaServiciosComponent {
  @Input() servicios: any[] = [];

  aplicar(servicioId: number) {
    console.log('Aplicar servicio ID:', servicioId);
    // caravanaService.aplicarServicio(id, servicioId)
  }
}
