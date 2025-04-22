import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadProductosComponent } from './ciudad-productos.component';

describe('CiudadProductosComponent', () => {
  let component: CiudadProductosComponent;
  let fixture: ComponentFixture<CiudadProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadProductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiudadProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
