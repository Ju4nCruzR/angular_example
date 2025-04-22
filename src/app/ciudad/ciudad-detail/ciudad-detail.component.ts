import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CiudadDetalleDto } from '../../model/ciudad-detalle-dto';
import { CiudadService } from '../../service/ciudad.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ciudad-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './ciudad-detail.component.html',
  styleUrl: './ciudad-detail.component.css'
})
export class CiudadDetailComponent implements OnInit {
  ciudad!: CiudadDetalleDto;

  constructor(private route: ActivatedRoute, private service: CiudadService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.obtener(id).subscribe(data => this.ciudad = data);
  }

  nuevoStock: { [productoId: number]: number } = {};

  actualizarStock(id: number): void {
    const stock = this.nuevoStock[id];
    if (stock != null) {
      this.service.actualizarStockProducto(id, stock).subscribe(() => {
        alert('Stock actualizado');
        this.ngOnInit(); // recarga datos
      });
    }
  }

  adquirirServicio(id: number): void {
    this.service.marcarServicioAdquirido(id).subscribe(() => {
      alert('Servicio marcado como adquirido');
      this.ngOnInit();
    });
  }

  eliminarServicio(id: number): void {
    this.service.eliminarServicio(id).subscribe(() => {
      alert('Servicio eliminado');
      this.ngOnInit();
    });
  }

  nuevoProductoId = 0;
  stockNuevoProducto = 1;

  nuevaRutaId = 0;

  agregarProducto(): void {
    const idCiudad = this.ciudad.ciudad.id;
    this.service.crearProductoEnCiudad(idCiudad, this.nuevoProductoId, this.stockNuevoProducto).subscribe(() => {
      alert('Producto agregado');
      this.ngOnInit();
    });
  }
  
  eliminarProducto(productoId: number): void {
    const idCiudad = this.ciudad.ciudad.id;
    this.service.eliminarProductoDeCiudad(idCiudad, productoId).subscribe(() => {
      alert('Producto eliminado');
      this.ngOnInit();
    });
  }

  agregarRuta(): void {
    const idCiudad = this.ciudad.ciudad.id;
    this.service.crearRuta(idCiudad, this.nuevaRutaId).subscribe(() => {
      alert('Ruta agregada');
      this.ngOnInit();
    });
  }

  eliminarRuta(id: number): void {
    this.service.eliminarRuta(id).subscribe(() => {
      alert('Ruta eliminada');
      this.ngOnInit();
    });
  }

}

