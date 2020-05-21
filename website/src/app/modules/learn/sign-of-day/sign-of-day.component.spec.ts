import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignOfDayComponent } from './sign-of-day.component';

describe('SignOfDayComponent', () => {
  let component: SignOfDayComponent;
  let fixture: ComponentFixture<SignOfDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignOfDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignOfDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
