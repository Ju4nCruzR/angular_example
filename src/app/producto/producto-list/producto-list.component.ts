import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoDto } from '../../dto/producto/producto-dto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {
  productos: ProductoDto[] = [];
  mensaje: string = '';

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productoService.listarProductos().subscribe(data => {
      this.productos = data;
    });

    this.route.queryParams.subscribe(params => {
      if (params['mensaje']) {
        this.mensaje = params['mensaje'];
      }
    });
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Deseas eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe(() => {
        this.productos = this.productos.filter(p => p.id !== id);
        this.mensaje = 'Producto eliminado correctamente.';
      });
    }
  }
}
