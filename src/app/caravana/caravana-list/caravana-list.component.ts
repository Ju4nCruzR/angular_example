import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CaravanaService } from '../caravana.service';
import { CaravanaDto } from '../dto/caravana-dto';
import { CaravanaViewComponent } from '../caravana-view/caravana-view.component';

@Component({
  selector: 'app-caravana-list',
  standalone: true,
  imports: [CommonModule, CaravanaViewComponent],
  templateUrl: './caravana-list.component.html',
  styleUrl: './caravana-list.component.css'
})
export class CaravanaListComponent {
  caravanas: CaravanaDto[] = [];

  selectedCaravana: CaravanaDto | undefined;

  constructor(private caravanaService: CaravanaService) {}

  ngOnInit(): void {
    this.caravanaService.listarCaravanas()
      .subscribe(listaCaravanas => {
        this.caravanas = listaCaravanas;
      });
  }

  seleccionarCaravana(caravana: CaravanaDto): void {
    this.selectedCaravana = caravana;
  }
  

}
