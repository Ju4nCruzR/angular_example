import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JugadorService } from '../../service/jugador.service';
import { JugadorDto } from '../../model/jugador-dto'; 

@Component({
  selector: 'app-jugador-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jugador-detail.component.html',
  styleUrl: './jugador-detail.component.css'
})
export class JugadorDetailComponent implements OnInit {
  jugador!: JugadorDto;

  constructor(
    private route: ActivatedRoute,
    private jugadorService: JugadorService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.jugadorService.ver(id).subscribe(j => {
      this.jugador = j;
    });
  }
}