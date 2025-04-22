import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CaravanaDto } from './dto/caravana-dto';

@Injectable({
  providedIn: 'root'
})
export class CaravanaService {

  constructor(
    private http: HttpClient
  ) { }

  listarCaravanas() : Observable<CaravanaDto[]>{
    return this.http.get<CaravanaDto[]>("http://localhost:8080/caravana/list")
  }

}
