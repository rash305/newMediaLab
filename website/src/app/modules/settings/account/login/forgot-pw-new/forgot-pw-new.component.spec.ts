import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPwNewComponent } from './forgot-pw-new.component';

describe('ForgotPwNewComponent', () => {
  let component: ForgotPwNewComponent;
  let fixture: ComponentFixture<ForgotPwNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPwNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPwNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
