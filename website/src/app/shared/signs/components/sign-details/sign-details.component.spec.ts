import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignDetailsComponent } from './sign-details.component';

describe('SignDetailsComponent', () => {
  let component: SignDetailsComponent;
  let fixture: ComponentFixture<SignDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
