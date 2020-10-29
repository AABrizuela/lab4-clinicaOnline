import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProfesionalComponent } from './home-profesional.component';

describe('HomeProfesionalComponent', () => {
  let component: HomeProfesionalComponent;
  let fixture: ComponentFixture<HomeProfesionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProfesionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
