import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTheWordComponent } from './complete-the-word.component';

describe('CompleteTheWordComponent', () => {
  let component: CompleteTheWordComponent;
  let fixture: ComponentFixture<CompleteTheWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteTheWordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteTheWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
