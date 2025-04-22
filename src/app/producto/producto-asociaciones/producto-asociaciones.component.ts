import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoAsociacionesDto } from '../../dto/producto/producto-asociaciones-dto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-asociaciones',
  templateUrl: './producto-asociaciones.component.html',
  styleUrls: ['./producto-asociaciones.component.css']
})
export class ProductoAsociacionesComponent implements OnInit {
  asociaciones!: ProductoAsociacionesDto;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productoService.verAsociaciones(id).subscribe(data => {
      this.asociaciones = data;
    });
  }
}
