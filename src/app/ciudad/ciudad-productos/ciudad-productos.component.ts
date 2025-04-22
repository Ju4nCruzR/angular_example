import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CiudadService } from '../ciudad.service';
import { CiudadProductoDto } from '../../dto/ciudad/ciudad-producto-dto';

@Component({
  selector: 'app-ciudad-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ciudad-productos.component.html',
  styleUrls: ['./ciudad-productos.component.css']
})
export class CiudadProductosComponent implements OnInit {
  ciudadId!: number;
  productos: CiudadProductoDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private ciudadService: CiudadService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ciudadId = +id;
      this.cargarProductos();
    }
  }

  cargarProductos(): void {
    this.ciudadService.listarProductosPorCiudad(this.ciudadId).subscribe(data => {
      this.productos = data;
    });
  }

  actualizarStock(producto: CiudadProductoDto): void {
    this.ciudadService.actualizarStockProductoCiudad(producto.id, producto.stockProducto).subscribe(() => {
      alert('Stock actualizado');
    });
  }

  eliminarProducto(producto: CiudadProductoDto): void {
    if (confirm(`¿Eliminar ${producto.nombreProducto} de la ciudad?`)) {
      this.ciudadService.eliminarProductoCiudad(this.ciudadId, producto.productoId).subscribe(() => {
        this.productos = this.productos.filter(p => p.productoId !== producto.productoId);
      });
    }
  }
}
