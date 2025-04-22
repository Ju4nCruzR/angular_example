import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-caravana-jugadores',
  templateUrl: './caravana-jugadores.component.html'
})
export class CaravanaJugadoresComponent {
  @Input() jugadores: any[] = [];
}
