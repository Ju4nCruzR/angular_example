import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RutaService } from '../../service/ruta.service';
import { RutaDto } from '../../model/ruta-dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ruta-detail',
  standalone: true,
  templateUrl: './ruta-detail.component.html',
  styleUrl: './ruta-detail.component.css',
  imports: [CommonModule, RouterModule]
})
export class RutaDetailComponent implements OnInit {
  ruta?: RutaDto;

  constructor(
    private route: ActivatedRoute,
    private service: RutaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.obtener(id).subscribe(data => this.ruta = data);
  }
}
