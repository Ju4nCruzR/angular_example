import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../producto.service';
import { ProductoDto } from '../../dto/producto/producto-dto';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {
  productoId!: number;
  producto: ProductoDto = new ProductoDto();
  mensaje: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.productoId = +this.route.snapshot.paramMap.get('id')!;
    this.productoService.verProducto(this.productoId).subscribe(data => {
      this.producto = data;
    });
  }

  guardarCambios(): void {
    this.productoService.editarProducto(this.productoId, this.producto).subscribe(() => {
      this.router.navigate(['/productos'], {
        queryParams: { mensaje: 'Producto actualizado correctamente.' }
      });
    });
  }
}

