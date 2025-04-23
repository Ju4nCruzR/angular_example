import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugarDetailComponent } from './jugar-detail.component';

describe('JugarDetailComponent', () => {
  let component: JugarDetailComponent;
  let fixture: ComponentFixture<JugarDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugarDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JugarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
