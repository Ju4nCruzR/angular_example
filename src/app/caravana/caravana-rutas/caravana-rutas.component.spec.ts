import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaravanaRutasComponent } from './caravana-rutas.component';

describe('CaravanaRutasComponent', () => {
  let component: CaravanaRutasComponent;
  let fixture: ComponentFixture<CaravanaRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaravanaRutasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaravanaRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
