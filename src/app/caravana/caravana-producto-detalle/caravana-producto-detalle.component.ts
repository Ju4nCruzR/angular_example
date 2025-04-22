import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CaravanaService } from '../caravana.service';
import { CaravanaProductoDto } from '../../dto/caravana/caravana-producto-dto';

@Component({
  selector: 'app-caravana-producto-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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

