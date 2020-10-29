import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtifiloCoachComponent } from './protifilo-coach.component';

describe('ProtifiloCoachComponent', () => {
  let component: ProtifiloCoachComponent;
  let fixture: ComponentFixture<ProtifiloCoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtifiloCoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtifiloCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
