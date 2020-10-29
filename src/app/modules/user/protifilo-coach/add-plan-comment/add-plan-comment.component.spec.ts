import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanCommentComponent } from './add-plan-comment.component';

describe('AddPlanCommentComponent', () => {
  let component: AddPlanCommentComponent;
  let fixture: ComponentFixture<AddPlanCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlanCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
