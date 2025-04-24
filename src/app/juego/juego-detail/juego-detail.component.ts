import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JuegoService } from '../../service/juego.service'; 
import { JuegoDetalleDto } from '../../model/juego-detalle-dto'; 
import { JugadorDto } from '../../model/jugador-dto'; 
import { CaravanaResumenDto } from '../../model/caravana-resumen-dto'; 

@Component({
  selector: 'app-juego-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './juego-detail.component.html',
  styleUrl: './juego-detail.component.css'
})
export class JuegoDetailComponent implements OnInit {
  juego!: JuegoDetalleDto;

  constructor(
    private route: ActivatedRoute,
    private juegoService: JuegoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.juegoService.ver(id).subscribe(data => {
      this.juego = data;
    });
  }
}