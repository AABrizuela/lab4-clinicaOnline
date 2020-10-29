import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaProfesionalComponent } from './alta-profesional.component';

describe('AltaProfesionalComponent', () => {
  let component: AltaProfesionalComponent;
  let fixture: ComponentFixture<AltaProfesionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaProfesionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
