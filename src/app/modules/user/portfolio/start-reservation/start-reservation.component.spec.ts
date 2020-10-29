import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartReservationComponent } from './start-reservation.component';

describe('StartReservationComponent', () => {
  let component: StartReservationComponent;
  let fixture: ComponentFixture<StartReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
