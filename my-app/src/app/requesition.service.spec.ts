import { TestBed } from '@angular/core/testing';

import { RequesitionService } from './requesition.service';

describe('RequesitionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequesitionService = TestBed.get(RequesitionService);
    expect(service).toBeTruthy();
  });
});
