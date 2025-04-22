import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CaravanaDto } from '../../dto/caravana/caravana-dto';
import { CaravanaService } from '../caravana.service';

@Component({
  selector: 'app-caravana-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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

