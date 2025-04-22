import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadRutasComponent } from './ciudad-rutas.component';

describe('CiudadRutasComponent', () => {
  let component: CiudadRutasComponent;
  let fixture: ComponentFixture<CiudadRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadRutasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiudadRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
