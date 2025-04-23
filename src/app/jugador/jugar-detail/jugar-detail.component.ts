import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JugadorDto } from '../../model/jugador-dto';
import { JugadorService } from '../../service/jugador.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-jugar-detail',
  standalone: true,
  templateUrl: './jugar-detail.component.html',
  styleUrl: './jugar-detail.component.css',
  imports: [CommonModule, RouterModule]
})
export class JugarDetailComponent implements OnInit {
  jugador?: JugadorDto;

  constructor(
    private route: ActivatedRoute,
    private service: JugadorService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.obtener(id).subscribe(data => this.jugador = data);
  }
}
