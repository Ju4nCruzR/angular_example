import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaravanaEditComponent } from './caravana-edit.component';

describe('CaravanaEditComponent', () => {
  let component: CaravanaEditComponent;
  let fixture: ComponentFixture<CaravanaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaravanaEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaravanaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
