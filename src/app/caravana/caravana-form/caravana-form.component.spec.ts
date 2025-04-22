import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaravanaFormComponent } from './caravana-form.component';

describe('CaravanaFormComponent', () => {
  let component: CaravanaFormComponent;
  let fixture: ComponentFixture<CaravanaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaravanaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaravanaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
