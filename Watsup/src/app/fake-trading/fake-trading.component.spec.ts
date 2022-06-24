import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeTradingComponent } from './fake-trading.component';

describe('FakeTradingComponent', () => {
  let component: FakeTradingComponent;
  let fixture: ComponentFixture<FakeTradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeTradingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeTradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
