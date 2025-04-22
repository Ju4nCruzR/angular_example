import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaravanaProductoDetalleComponent } from './caravana-producto-detalle.component';

describe('CaravanaProductoDetalleComponent', () => {
  let component: CaravanaProductoDetalleComponent;
  let fixture: ComponentFixture<CaravanaProductoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaravanaProductoDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaravanaProductoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
