import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSignConfirmComponent } from './add-sign-confirm.component';

describe('AddSignConfirmComponent', () => {
  let component: AddSignConfirmComponent;
  let fixture: ComponentFixture<AddSignConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSignConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSignConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
