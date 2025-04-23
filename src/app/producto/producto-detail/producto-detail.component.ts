import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../service/producto.service';
import { ProductoAsociacionesDto } from '../../model/producto-asociaciones-dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-producto-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './producto-detail.component.html',
  styleUrl: './producto-detail.component.css'
})
export class ProductoDetailComponent implements OnInit {
  productoAsociado!: ProductoAsociacionesDto;

  constructor(
    private route: ActivatedRoute,
    private service: ProductoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.obtenerAsociaciones(id).subscribe(data => this.productoAsociado = data);
  }
}