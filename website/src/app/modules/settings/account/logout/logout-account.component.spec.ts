import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutAccountComponent } from './logout-account.component';

describe('LogoutComponent', () => {
  let component: LogoutAccountComponent;
  let fixture: ComponentFixture<LogoutAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
