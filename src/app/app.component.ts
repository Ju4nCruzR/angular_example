import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CaravanaListComponent } from './caravana/caravana-list/caravana-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CaravanaListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title: string = 'angular_example';

  cambiarTexto(){
    this.title = "hola hola";
  }
}
