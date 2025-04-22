import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaravanaService } from '../caravana.service';
import { CaravanaDetalleDto } from '../dto/caravana-detalle-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caravana-view',
  templateUrl: './caravana-view.component.html',
})
export class CaravanaViewComponent {
  caravana!: CaravanaDetalleDto;
  caravanaId!: number;

  ciudadDestinoId!: number;
  productoCompraId!: number;
  cantidadCompra!: number;
  productoVentaId!: number;
  cantidadVenta!: number;
  servicioId!: number;
  jugadorNombre!: string;
  jugadorRol: 'CARAVANERO' | 'COMERCIANTE' = 'CARAVANERO';

  constructor(
    private route: ActivatedRoute,
    private caravanaService: CaravanaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.caravanaId = +id;
      this.caravanaService.obtenerCaravana(this.caravanaId).subscribe((data) => {
        this.caravana = data;
      });
    }
  }

  moverCaravana(): void {
    this.caravanaService.moverCaravana(this.caravanaId, this.ciudadDestinoId).subscribe(() => {
      alert('Caravana movida con éxito');
    });
  }

  comprarProducto(): void {
    this.caravanaService.comprarProducto(this.caravanaId, this.productoCompraId, this.cantidadCompra).subscribe(() => {
      alert('Compra realizada');
    });
  }

  venderProducto(): void {
    this.caravanaService.venderProducto(this.caravanaId, this.productoVentaId, this.cantidadVenta).subscribe(() => {
      alert('Venta realizada');
    });
  }

  aplicarServicio(): void {
    this.caravanaService.aplicarServicio(this.caravanaId, this.servicioId).subscribe(() => {
      alert('Servicio aplicado');
    });
  }

  agregarJugador(): void {
    this.caravanaService.agregarJugador(this.caravanaId, this.jugadorNombre, this.jugadorRol).subscribe(() => {
      alert('Jugador agregado');
    });
  }

  eliminarCaravana(): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta caravana?')) {
      this.caravanaService.eliminarCaravana(this.caravanaId).subscribe(() => {
        alert('Caravana eliminada');
        this.router.navigate(['/caravanas']); // redirige a la lista
      });
    }
  }
}


