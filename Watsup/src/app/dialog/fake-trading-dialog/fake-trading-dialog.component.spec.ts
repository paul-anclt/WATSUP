import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeTradingDialogComponent } from './fake-trading-dialog.component';

describe('FakeTradingDialogComponent', () => {
  let component: FakeTradingDialogComponent;
  let fixture: ComponentFixture<FakeTradingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeTradingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeTradingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
