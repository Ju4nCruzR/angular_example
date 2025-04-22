import { Component, OnInit } from '@angular/core';
import { CaravanaDto } from '../dto/caravana-dto';
import { CaravanaService } from '../caravana.service';

@Component({
  selector: 'app-caravana-list',
  templateUrl: './caravana-list.component.html'
})
export class CaravanaListComponent implements OnInit {
  caravanas: CaravanaDto[] = [];
  selectedCaravana?: CaravanaDto;

  constructor(private caravanaService: CaravanaService) {}

  ngOnInit(): void {
    this.caravanaService.listarCaravanas().subscribe(data => {
      this.caravanas = data;
    });
  }

  seleccionarCaravana(caravana: CaravanaDto): void {
    this.selectedCaravana = caravana;
  }
}

