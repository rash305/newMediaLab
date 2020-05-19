import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDictionaryComponent } from './personal-dictionary.component';

describe('PersonalDictionaryComponent', () => {
  let component: PersonalDictionaryComponent;
  let fixture: ComponentFixture<PersonalDictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalDictionaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
