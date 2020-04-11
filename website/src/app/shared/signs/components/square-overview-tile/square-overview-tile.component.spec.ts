import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareOverviewTileComponent } from './square-overview-tile.component';

describe('SquareOverviewTileComponent', () => {
  let component: SquareOverviewTileComponent;
  let fixture: ComponentFixture<SquareOverviewTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquareOverviewTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareOverviewTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
