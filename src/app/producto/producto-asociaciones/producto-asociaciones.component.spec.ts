import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoAsociacionesComponent } from './producto-asociaciones.component';

describe('ProductoAsociacionesComponent', () => {
  let component: ProductoAsociacionesComponent;
  let fixture: ComponentFixture<ProductoAsociacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoAsociacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductoAsociacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
