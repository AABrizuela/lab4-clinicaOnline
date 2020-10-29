import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitarProfComponent } from './habilitar-prof.component';

describe('HabilitarProfComponent', () => {
  let component: HabilitarProfComponent;
  let fixture: ComponentFixture<HabilitarProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabilitarProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabilitarProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
