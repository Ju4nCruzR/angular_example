import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../juego.service';
import { JuegoResumenDto } from '../../dto/juego/juego-resumen-dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-juego-list',
  templateUrl: './juego-list.component.html',
  styleUrls: ['./juego-list.component.css']
})
export class JuegoListComponent implements OnInit {
  juegos: JuegoResumenDto[] = [];
  mensaje: string = '';

  constructor(
    private juegoService: JuegoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.juegoService.listarJuegos().subscribe(data => {
      this.juegos = data;
    });

    this.route.queryParams.subscribe(params => {
      if (params['mensaje']) {
        this.mensaje = params['mensaje'];
      }
    });
  }

  eliminarJuego(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este juego?')) {
      this.juegoService.eliminarJuego(id).subscribe(() => {
        this.juegos = this.juegos.filter(j => j.id !== id);
        this.mensaje = 'Juego eliminado correctamente.';
      });
    }
  }
}
