import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioAsociacionesComponent } from './servicio-asociaciones.component';

describe('ServicioAsociacionesComponent', () => {
  let component: ServicioAsociacionesComponent;
  let fixture: ComponentFixture<ServicioAsociacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioAsociacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicioAsociacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
