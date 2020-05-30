import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPwConfirmComponent } from './forgot-pw-confirm.component';

describe('ForgotPwConfirmComponent', () => {
  let component: ForgotPwConfirmComponent;
  let fixture: ComponentFixture<ForgotPwConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPwConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPwConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
