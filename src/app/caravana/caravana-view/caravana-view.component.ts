import { Component, Input } from '@angular/core';
import { CaravanaDto } from '../dto/caravana-dto';
import { CaravanaService } from '../caravana.service';

@Component({
  selector: 'app-caravana-view',
  templateUrl: './caravana-view.component.html'
})
export class CaravanaViewComponent {
  @Input() caravana?: CaravanaDto;

  ciudadDestinoId!: number;
  productoCompraId!: number;
  cantidadCompra!: number;
  productoVentaId!: number;
  cantidadVenta!: number;
  servicioId!: number;
  jugadorNombre!: string;
  jugadorRol: string = 'CARAVANERO';

  constructor(private caravanaService: CaravanaService) {}

  moverCaravana(): void {
    if (this.caravana?.id && this.ciudadDestinoId) {
      this.caravanaService.moverCaravana(this.caravana.id, this.ciudadDestinoId)
        .subscribe(() => alert('Caravana movida correctamente'));
    }
  }

  comprarProducto(): void {
    if (this.caravana?.id && this.productoCompraId && this.cantidadCompra) {
      this.caravanaService.comprarProducto(this.caravana.id, this.productoCompraId, this.cantidadCompra)
        .subscribe(() => alert('Compra realizada'));
    }
  }

  venderProducto(): void {
    if (this.caravana?.id && this.productoVentaId && this.cantidadVenta) {
      this.caravanaService.venderProducto(this.caravana.id, this.productoVentaId, this.cantidadVenta)
        .subscribe(() => alert('Venta realizada'));
    }
  }

  aplicarServicio(): void {
    if (this.caravana?.id && this.servicioId) {
      this.caravanaService.aplicarServicio(this.caravana.id, this.servicioId)
        .subscribe(() => alert('Servicio aplicado'));
    }
  }

  agregarJugador(): void {
    if (this.caravana?.id && this.jugadorNombre && this.jugadorRol) {
      this.caravanaService.agregarJugador(this.caravana.id, this.jugadorNombre, this.jugadorRol)
        .subscribe(() => alert('Jugador agregado'));
    }
  }
}

