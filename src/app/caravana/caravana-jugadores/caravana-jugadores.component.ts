import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CaravanaService } from '../caravana.service';

@Component({
  selector: 'app-caravana-jugadores',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './caravana-jugadores.component.html'
})
export class CaravanaJugadoresComponent implements OnInit {
  jugadores: any[] = [];
  caravanaId!: number;

  constructor(
    private route: ActivatedRoute,
    private caravanaService: CaravanaService
  ) {}

  ngOnInit(): void {
    this.caravanaId = Number(this.route.parent?.snapshot.paramMap.get('id'));

    this.caravanaService.obtenerCaravana(this.caravanaId).subscribe(data => {
      this.jugadores = (data as any).jugadores || [];
    });
  }
}

