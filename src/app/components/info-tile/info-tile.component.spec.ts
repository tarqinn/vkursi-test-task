import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTileComponent } from './info-tile.component';

describe('InfoTileComponent', () => {
  let component: InfoTileComponent;
  let fixture: ComponentFixture<InfoTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoTileComponent]
    });
    fixture = TestBed.createComponent(InfoTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
