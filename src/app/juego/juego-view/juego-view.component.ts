import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { JuegoService } from '../juego.service';
import { JuegoDetalleDto } from '../../dto/juego/juego-detalle-dto';

@Component({
  selector: 'app-juego-view',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './juego-view.component.html',
  styleUrls: ['./juego-view.component.css']
})
export class JuegoViewComponent implements OnInit {
  juego!: JuegoDetalleDto;

  constructor(
    private route: ActivatedRoute,
    private juegoService: JuegoService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.juegoService.verJuego(id).subscribe(data => {
      this.juego = data;
    });
  }
}
