import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanncoursComponent } from './planncours.component';

describe('PlanncoursComponent', () => {
  let component: PlanncoursComponent;
  let fixture: ComponentFixture<PlanncoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanncoursComponent]
    });
    fixture = TestBed.createComponent(PlanncoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
