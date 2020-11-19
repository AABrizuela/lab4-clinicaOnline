import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusqAdminComponent } from './busq-admin.component';

describe('BusqAdminComponent', () => {
  let component: BusqAdminComponent;
  let fixture: ComponentFixture<BusqAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusqAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusqAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
