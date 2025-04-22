import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaravanaProductoListComponent } from './caravana-producto-list.component';

describe('CaravanaProductoListComponent', () => {
  let component: CaravanaProductoListComponent;
  let fixture: ComponentFixture<CaravanaProductoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaravanaProductoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaravanaProductoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
