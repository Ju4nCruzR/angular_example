import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioDetailComponent } from './servicio-detail.component';

describe('ServicioDetailComponent', () => {
  let component: ServicioDetailComponent;
  let fixture: ComponentFixture<ServicioDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
