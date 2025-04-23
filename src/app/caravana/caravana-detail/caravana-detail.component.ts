import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CaravanaService } from '../../service/caravana.service';
import { CaravanaDetalleDto } from '../../model/caravana-detalle-dto';

@Component({
  selector: 'app-caravana-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './caravana-detail.component.html',
  styleUrl: './caravana-detail.component.css'
})
export class CaravanaDetailComponent implements OnInit {
  caravana!: CaravanaDetalleDto;

  ciudadId: number = 0;
  productoId: number = 0;
  cantidad: number = 1;
  servicioId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private service: CaravanaService
  ) {}
  
  nuevoStock: { [productoId: number]: number } = {};

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.obtener(id).subscribe(data => {
      this.caravana = data;
    });
  }

  mover() {
    this.service.moverCaravana(this.caravana.caravana.id, this.ciudadId)
      .subscribe(() => alert('¡Caravana movida!'));
  }

  comprar() {
    this.service.comprar({
      caravanaId: this.caravana.caravana.id,
      productoId: this.productoId,
      cantidad: this.cantidad
    }).subscribe(() => alert('¡Producto comprado!'));
  }

  vender() {
    this.service.vender({
      caravanaId: this.caravana.caravana.id,
      productoId: this.productoId,
      cantidad: this.cantidad
    }).subscribe(() => alert('¡Producto vendido!'));
  }

  aplicarServicio() {
    this.service.aplicarServicio(this.caravana.caravana.id, this.servicioId)
      .subscribe(() => alert('¡Servicio aplicado!'));
  }

  actualizarStock(id: number): void {
    const stock = this.nuevoStock[id];
    if (stock != null) {
      this.service.actualizarStockProducto(id, stock).subscribe(() => {
        alert('Stock actualizado');
        this.ngOnInit(); // recarga los datos
      });
    }
  }
  
}
