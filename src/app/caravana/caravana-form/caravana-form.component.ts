import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'
import { CaravanaService } from '../../service/caravana.service';
import { CaravanaFormularioDto } from '../../model/caravana-formulario-dto';


@Component({
  selector: 'app-caravana-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './caravana-form.component.html',
  styleUrl: './caravana-form.component.css'
})
export class CaravanaFormComponent implements OnInit {

  form!: FormGroup;
  editar: boolean = false;
  caravanaId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private caravanaService: CaravanaService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombreCaravana: ['', Validators.required],
      velocidadCaravana: [0, Validators.required],
      capacidadMaximaCargaCaravana: [0, Validators.required],
      dineroDisponibleCaravana: [0, Validators.required],
      puntosDeVidaCaravana: [0, Validators.required],
      ciudadId: [0, Validators.required] // se deja como campo libre
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editar = true;
      this.caravanaId = Number(idParam);

      this.caravanaService.obtener(this.caravanaId).subscribe((data) => {
        this.form.patchValue({
          nombreCaravana: data.caravana.nombreCaravana,
          velocidadCaravana: data.caravana.velocidadCaravana,
          capacidadMaximaCargaCaravana: data.caravana.capacidadMaximaCargaCaravana,
          dineroDisponibleCaravana: data.caravana.dineroDisponibleCaravana,
          puntosDeVidaCaravana: data.caravana.puntosDeVidaCaravana,
          ciudadId: data.caravana.ciudadId
        });
      });
    }
  }

  guardar(): void {
    const dto: CaravanaFormularioDto = this.form.value;

    if (this.editar) {
      this.caravanaService.actualizar(this.caravanaId, dto).subscribe(() => {
        this.router.navigate(['/caravana']);
      });
    } else {
      this.caravanaService.crear(dto).subscribe(() => {
        this.router.navigate(['/caravana']);
      });
    }
  }
}