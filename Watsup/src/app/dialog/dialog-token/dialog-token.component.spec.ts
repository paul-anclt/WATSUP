import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTokenComponent } from './dialog-token.component';

describe('DialogTokenComponent', () => {
  let component: DialogTokenComponent;
  let fixture: ComponentFixture<DialogTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
