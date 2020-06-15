import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnderzoeksPopupComponent } from './onderzoeks-popup.component';

describe('OnderzoeksPopupComponent', () => {
  let component: OnderzoeksPopupComponent;
  let fixture: ComponentFixture<OnderzoeksPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnderzoeksPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnderzoeksPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
