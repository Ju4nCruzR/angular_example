import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JuegoService } from '../juego.service';
import { JuegoFormularioDto } from '../../dto/juego/juego-formulario-dto';

@Component({
  selector: 'app-juego-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './juego-edit.component.html',
  styleUrls: ['./juego-edit.component.css']
})
export class JuegoEditComponent implements OnInit {
  juegoId!: number;
  formulario: JuegoFormularioDto = new JuegoFormularioDto();
  caravanaIdsTexto: string = '';
  mensaje: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private juegoService: JuegoService
  ) {}

  ngOnInit(): void {
    this.juegoId = +this.route.snapshot.paramMap.get('id')!;
    this.juegoService.obtenerFormulario(this.juegoId).subscribe((dto) => {
      this.formulario = dto;
      this.caravanaIdsTexto = dto.caravanaIds.join(',');
    });
  }

  guardarCambios(): void {
    this.formulario.caravanaIds = this.caravanaIdsTexto
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(Number);

    this.juegoService.editarJuego(this.juegoId, this.formulario).subscribe(() => {
      this.router.navigate(['/juegos'], {
        queryParams: { mensaje: 'Juego actualizado correctamente.' }
      });
    });
  }
}
