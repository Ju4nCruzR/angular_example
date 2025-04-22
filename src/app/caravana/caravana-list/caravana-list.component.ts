import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CaravanaDto } from '../../dto/caravana/caravana-dto';
import { CaravanaDetalleDto } from '../../dto/caravana/caravana-detalle-dto';
import { CaravanaService } from '../caravana.service';
import { CaravanaViewComponent } from '../caravana-view/caravana-view.component';

@Component({
  selector: 'app-caravana-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CaravanaViewComponent],
  templateUrl: './caravana-list.component.html'
})
export class CaravanaListComponent implements OnInit {
  caravanas: CaravanaDto[] = [];
  selectedCaravana?: CaravanaDetalleDto;

  constructor(private caravanaService: CaravanaService) {}

  ngOnInit(): void {
    this.caravanaService.listarCaravanas().subscribe(data => {
      this.caravanas = data;
    });
  }

  seleccionarCaravana(caravana: CaravanaDto): void {
    this.caravanaService.obtenerCaravana(caravana.id).subscribe(detalle => {
      this.selectedCaravana = detalle;
    });
  }
}


