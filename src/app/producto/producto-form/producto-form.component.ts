import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoDto } from '../../dto/producto/producto-dto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent {
  producto: ProductoDto = new ProductoDto();
  mensaje: string = '';

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}

  crearProducto(): void {
    this.productoService.crearProducto(this.producto).subscribe(() => {
      this.router.navigate(['/productos'], {
        queryParams: { mensaje: 'Producto creado exitosamente.' }
      });
    });
  }
}
