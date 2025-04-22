import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CaravanaProductoDto } from '../../dto/caravana//caravana-producto-dto';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-caravana-productos',
  templateUrl: './caravana-productos.component.html'
})
export class CaravanaProductosComponent {
  @Input() productos: CaravanaProductoDto[] = [];
}
