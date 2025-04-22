import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JugadorService } from '../jugador.service';
import { JugadorDto } from '../../dto/jugador/jugador-dto';

@Component({
  selector: 'app-jugador-view',
  templateUrl: './jugador-view.component.html',
  styleUrls: ['./jugador-view.component.css']
})
export class JugadorViewComponent implements OnInit {
  jugador!: JugadorDto;

  constructor(
    private route: ActivatedRoute,
    private jugadorService: JugadorService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.jugadorService.verJugador(id).subscribe(data => {
      this.jugador = data;
    });
  }
}
