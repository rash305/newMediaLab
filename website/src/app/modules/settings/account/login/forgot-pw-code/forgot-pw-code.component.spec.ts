import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPwCodeComponent } from './forgot-pw-code.component';

describe('ForgotPwCodeComponent', () => {
  let component: ForgotPwCodeComponent;
  let fixture: ComponentFixture<ForgotPwCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPwCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPwCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
