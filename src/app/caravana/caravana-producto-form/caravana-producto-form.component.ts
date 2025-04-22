import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CaravanaService } from '../caravana.service';

@Component({
  selector: 'app-caravana-producto-form',
  templateUrl: './caravana-producto-form.component.html',
  styleUrls: ['./caravana-producto-form.component.css']
})
export class CaravanaProductoFormComponent {
  caravanaId: number = 0;
  productoId: number = 0;
  stock: number = 0;

  constructor(
    private caravanaService: CaravanaService,
    private router: Router
  ) {}

  crearProducto(): void {
    if (this.caravanaId && this.productoId && this.stock >= 0) {
      this.caravanaService
        .crearProductoEnCaravana(this.caravanaId, this.productoId, this.stock)
        .subscribe(() => {
          this.router.navigate(['/caravana-productos'], {
            queryParams: { mensaje: 'Producto creado exitosamente en la caravana.' }
          });
        });
    } else {
      alert('Por favor completa todos los campos correctamente.');
    }
  }
  
}
