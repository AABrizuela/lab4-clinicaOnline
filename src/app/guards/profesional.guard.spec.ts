import { TestBed } from '@angular/core/testing';

import { ProfesionalGuard } from './profesional.guard';

describe('ProfesionalGuard', () => {
  let guard: ProfesionalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfesionalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
