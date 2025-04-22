import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoViewComponent } from './juego-view.component';

describe('JuegoViewComponent', () => {
  let component: JuegoViewComponent;
  let fixture: ComponentFixture<JuegoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JuegoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
