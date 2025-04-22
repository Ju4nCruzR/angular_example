import { Component, OnInit } from '@angular/core';
import { CiudadService } from '../ciudad.service';
import { CiudadDto } from '../../dto/ciudad/ciudad-dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ciudad-list',
  templateUrl: './ciudad-list.component.html',
  styleUrls: ['./ciudad-list.component.css']
})
export class CiudadListComponent implements OnInit {
  ciudades: CiudadDto[] = [];
  mensaje: string = '';

  constructor(
    private ciudadService: CiudadService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ciudadService.listarCiudades().subscribe(data => {
      this.ciudades = data;
    });

    this.route.queryParams.subscribe(params => {
      if (params['mensaje']) {
        this.mensaje = params['mensaje'];
      }
    });
  }

  eliminarCiudad(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta ciudad?')) {
      this.ciudadService.eliminarCiudad(id).subscribe(() => {
        this.ciudades = this.ciudades.filter(c => c.id !== id);
        this.mensaje = 'Ciudad eliminada exitosamente.';
      });
    }
  }
}
