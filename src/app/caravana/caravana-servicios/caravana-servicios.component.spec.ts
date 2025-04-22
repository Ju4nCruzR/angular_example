import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaravanaServiciosComponent } from './caravana-servicios.component';

describe('CaravanaServiciosComponent', () => {
  let component: CaravanaServiciosComponent;
  let fixture: ComponentFixture<CaravanaServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaravanaServiciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaravanaServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
