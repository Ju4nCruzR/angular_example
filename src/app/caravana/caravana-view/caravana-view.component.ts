import { Component, Input } from '@angular/core';
import { CaravanaDto } from '../dto/caravana-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-caravana-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './caravana-view.component.html',
  styleUrl: './caravana-view.component.css'
})
export class CaravanaViewComponent {
  @Input()
  caravana: CaravanaDto | undefined
}
