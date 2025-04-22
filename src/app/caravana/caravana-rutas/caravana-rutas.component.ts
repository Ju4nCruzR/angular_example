import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CaravanaService } from '../caravana.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-caravana-rutas',
  templateUrl: './caravana-rutas.component.html'
})
export class CaravanaRutasComponent implements OnInit {
  rutasRecorridas: string[] = [];
  caravanaId!: number;

  constructor(
    private route: ActivatedRoute,
    private caravanaService: CaravanaService
  ) {}

  ngOnInit(): void {
    this.caravanaId = Number(this.route.parent?.snapshot.paramMap.get('id'));

    this.caravanaService.obtenerCaravana(this.caravanaId).subscribe(data => {
      this.rutasRecorridas = (data as any).rutasRecorridas || [];
    });
  }
}

