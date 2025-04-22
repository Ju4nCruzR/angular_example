import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CiudadService } from '../ciudad.service';
import { CiudadDetalleDto } from '../../dto/ciudad/ciudad-detalle-dto';

@Component({
  selector: 'app-ciudad-view',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ciudad-view.component.html',
  styleUrls: ['./ciudad-view.component.css']
})
export class CiudadViewComponent implements OnInit {
  detalle!: CiudadDetalleDto;

  constructor(
    private route: ActivatedRoute,
    private ciudadService: CiudadService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ciudadService.verCiudad(+id).subscribe(data => {
        this.detalle = data;
      });
    }
  }
}
