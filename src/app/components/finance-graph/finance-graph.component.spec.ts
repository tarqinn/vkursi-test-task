import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceGraphComponent } from './FinanceGraphComponent';

describe('FinanceGraphComponent', () => {
  let component: FinanceGraphComponent;
  let fixture: ComponentFixture<FinanceGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinanceGraphComponent]
    });
    fixture = TestBed.createComponent(FinanceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
