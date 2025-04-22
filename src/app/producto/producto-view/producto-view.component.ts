import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDto } from '../../dto/producto/producto-dto';
import { ProductoAsociacionesDto } from '../../dto/producto/producto-asociaciones-dto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-view',
  templateUrl: './producto-view.component.html',
  styleUrls: ['./producto-view.component.css']
})
export class ProductoViewComponent implements OnInit {
  producto!: ProductoDto;
  asociaciones!: ProductoAsociacionesDto;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    
    this.productoService.verProducto(id).subscribe(data => {
      this.producto = data;
    });

    this.productoService.verAsociaciones(id).subscribe(data => {
      this.asociaciones = data;
    });
  }
}
