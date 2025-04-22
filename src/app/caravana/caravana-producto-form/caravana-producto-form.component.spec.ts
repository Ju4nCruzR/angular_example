import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaravanaProductoFormComponent } from './caravana-producto-form.component';

describe('CaravanaProductoFormComponent', () => {
  let component: CaravanaProductoFormComponent;
  let fixture: ComponentFixture<CaravanaProductoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaravanaProductoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaravanaProductoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
