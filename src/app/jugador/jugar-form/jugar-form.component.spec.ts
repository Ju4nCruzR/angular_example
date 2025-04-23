import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugarFormComponent } from './jugar-form.component';

describe('JugarFormComponent', () => {
  let component: JugarFormComponent;
  let fixture: ComponentFixture<JugarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugarFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JugarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
