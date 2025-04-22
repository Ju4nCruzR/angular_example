import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaravanaDetailComponent } from './caravana-detail.component';

describe('CaravanaDetailComponent', () => {
  let component: CaravanaDetailComponent;
  let fixture: ComponentFixture<CaravanaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaravanaDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaravanaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
