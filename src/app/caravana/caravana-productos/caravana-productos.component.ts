import { Component, Input } from '@angular/core';
import { CaravanaProductoDto } from '../../dto/caravana/caravana-producto-dto';

@Component({
  selector: 'app-caravana-productos',
  templateUrl: './caravana-productos.component.html'
})
export class CaravanaProductosComponent {
  @Input() productos: CaravanaProductoDto[] = [];
}
