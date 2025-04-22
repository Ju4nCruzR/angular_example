import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaravanaListComponent } from './caravana-list.component';

describe('CaravanaListComponent', () => {
  let component: CaravanaListComponent;
  let fixture: ComponentFixture<CaravanaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaravanaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaravanaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
