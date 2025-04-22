import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaravanaProductosComponent } from './caravana-productos.component';

describe('CaravanaProductosComponent', () => {
  let component: CaravanaProductosComponent;
  let fixture: ComponentFixture<CaravanaProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaravanaProductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaravanaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
