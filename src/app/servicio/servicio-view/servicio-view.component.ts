import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-servicio-view',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './servicio-view.component.html',
  styleUrl: './servicio-view.component.css'
})
export class ServicioViewComponent {

}
