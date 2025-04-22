import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'
import { CaravanaService } from '../../service/caravana.service';

@Component({
  selector: 'app-caravana-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './caravana-form.component.html',
  styleUrl: './caravana-form.component.css'
})
export class CaravanaFormComponent implements OnInit {
  form!: FormGroup;
  editar = false;
  idCaravana?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: CaravanaService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombreCaravana: ['', Validators.required],
      velocidadCaravana: [0, Validators.required],
      capacidadMaximaCargaCaravana: [0, Validators.required],
      dineroDisponibleCaravana: [0, Validators.required],
      puntosDeVidaCaravana: [100, Validators.required],
      ciudadId: [1, Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editar = true;
      this.idCaravana = Number(id);
      this.service.obtener(this.idCaravana).subscribe(data => {
        const c = data.caravana;
        this.form.patchValue({
          nombreCaravana: c.nombreCaravana,
          velocidadCaravana: c.velocidadCaravana,
          capacidadMaximaCargaCaravana: c.capacidadMaximaCargaCaravana,
          dineroDisponibleCaravana: c.dineroDisponibleCaravana,
          puntosDeVidaCaravana: c.puntosDeVidaCaravana,
          ciudadId: 1 // actualízalo con el ID real si tienes uno dinámico
        });
      });
    }
  }

  guardar(): void {
    if (this.editar && this.idCaravana) {
      this.service.actualizar(this.idCaravana, this.form.value).subscribe(() => this.router.navigate(['/caravanas']));
    } else {
      this.service.crear(this.form.value).subscribe(() => this.router.navigate(['/caravanas']));
    }
  }
}

