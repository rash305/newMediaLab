import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixabayDisclaimerComponent } from './pixabay-disclaimer.component';

describe('PixabayDisclaimerComponent', () => {
  let component: PixabayDisclaimerComponent;
  let fixture: ComponentFixture<PixabayDisclaimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PixabayDisclaimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixabayDisclaimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
