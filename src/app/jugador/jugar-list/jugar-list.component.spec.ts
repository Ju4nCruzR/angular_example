import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugarListComponent } from './jugar-list.component';

describe('JugarListComponent', () => {
  let component: JugarListComponent;
  let fixture: ComponentFixture<JugarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugarListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JugarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
