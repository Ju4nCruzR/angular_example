import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductoDto } from '../../model/producto-dto';
import { ProductoService } from '../../service/producto.service';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.css'
})
export class ProductoListComponent implements OnInit {
  productos: ProductoDto[] = [];

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productoService.listar().subscribe(data => this.productos = data);
  }

  eliminar(id: number): void {
    if (confirm('¿Deseas eliminar este producto?')) {
      this.productoService.eliminar(id).subscribe(() => {
        alert('Producto eliminado');
        this.productos = this.productos.filter(p => p.id !== id);
      });
    }
  }

  ver(id: number): void {
    this.router.navigate(['/producto', id]);
  }

  editar(id: number): void {
    this.router.navigate(['/producto', id, 'editar']);
  }

  nuevo(): void {
    this.router.navigate(['/producto/nueva']);
  }
}
