import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaravanaService } from '../caravana.service';
import { CaravanaProductoDto } from '../dto/caravana-producto-dto';

@Component({
  selector: 'app-caravana-producto-detalle',
  templateUrl: './caravana-producto-detalle.component.html',
  styleUrls: ['./caravana-producto-detalle.component.css']
})
export class CaravanaProductoDetalleComponent implements OnInit {
  producto!: CaravanaProductoDto;
  nuevoStock: number = 0;
  mensaje: string = '';

  constructor(
    private route: ActivatedRoute,
    private caravanaService: CaravanaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.caravanaService.obtenerProductoPorId(+id).subscribe((data) => {
        this.producto = data;
        this.nuevoStock = data.stockEnCaravana;
      });
    }
  }

  actualizarStock(): void {
    if (this.nuevoStock >= 0) {
      this.caravanaService.actualizarStockProducto(this.producto.id, this.nuevoStock).subscribe(() => {
        this.mensaje = 'Stock actualizado correctamente.';
        this.producto.stockEnCaravana = this.nuevoStock;
      });
    } else {
      this.mensaje = 'El stock no puede ser negativo.';
    }
  }
}

