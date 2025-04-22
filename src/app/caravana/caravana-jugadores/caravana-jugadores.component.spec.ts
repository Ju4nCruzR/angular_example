import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaravanaJugadoresComponent } from './caravana-jugadores.component';

describe('CaravanaJugadoresComponent', () => {
  let component: CaravanaJugadoresComponent;
  let fixture: ComponentFixture<CaravanaJugadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaravanaJugadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaravanaJugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
