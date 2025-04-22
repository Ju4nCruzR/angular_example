import { Component, OnInit } from '@angular/core';
import { CaravanaService } from '../caravana.service';
import { CaravanaProductoDto } from '../../dto/caravana/caravana-producto-dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-caravana-producto-list',
  templateUrl: './caravana-producto-list.component.html',
  styleUrls: ['./caravana-producto-list.component.css']
})
export class CaravanaProductoListComponent implements OnInit {
  productos: CaravanaProductoDto[] = [];
  mensaje: string = '';

  constructor(
    private caravanaService: CaravanaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.caravanaService.listarTodosLosProductos().subscribe((data) => {
      this.productos = data;
    });

    this.route.queryParams.subscribe(params => {
      if (params['mensaje']) {
        this.mensaje = params['mensaje'];
      }
    });
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto de la caravana?')) {
      this.caravanaService.eliminarProductoDeCaravana(id).subscribe(() => {
        this.productos = this.productos.filter(p => p.id !== id);
      });
    }
  }
}

