import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JugadorService } from '../jugador.service';
import { JugadorDto } from '../../dto/jugador/jugador-dto';

@Component({
  selector: 'app-jugador-edit',
  templateUrl: './jugador-edit.component.html',
  styleUrls: ['./jugador-edit.component.css']
})
export class JugadorEditComponent implements OnInit {
  jugadorId!: number;
  jugador: JugadorDto = new JugadorDto();
  mensaje: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jugadorService: JugadorService
  ) {}

  ngOnInit(): void {
    this.jugadorId = +this.route.snapshot.paramMap.get('id')!;
    this.jugadorService.verJugador(this.jugadorId).subscribe(data => {
      this.jugador = data;
    });
  }

  guardarCambios(): void {
    this.jugadorService.editarJugador(this.jugadorId, this.jugador).subscribe(() => {
      this.router.navigate(['/jugadores'], {
        queryParams: { mensaje: 'Jugador actualizado correctamente.' }
      });
    });
  }
}
