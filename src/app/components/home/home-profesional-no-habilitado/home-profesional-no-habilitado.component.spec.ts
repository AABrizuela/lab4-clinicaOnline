import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProfesionalNoHabilitadoComponent } from './home-profesional-no-habilitado.component';

describe('HomeProfesionalNoHabilitadoComponent', () => {
  let component: HomeProfesionalNoHabilitadoComponent;
  let fixture: ComponentFixture<HomeProfesionalNoHabilitadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProfesionalNoHabilitadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProfesionalNoHabilitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
