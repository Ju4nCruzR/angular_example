import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadServiciosComponent } from './ciudad-servicios.component';

describe('CiudadServiciosComponent', () => {
  let component: CiudadServiciosComponent;
  let fixture: ComponentFixture<CiudadServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadServiciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiudadServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
