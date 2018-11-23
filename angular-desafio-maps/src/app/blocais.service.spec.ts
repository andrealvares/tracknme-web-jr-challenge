import { TestBed, inject } from '@angular/core/testing';

import { BlocaisService } from './blocais.service';

describe('BlocaisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlocaisService]
    });
  });

  it('should be created', inject([BlocaisService], (service: BlocaisService) => {
    expect(service).toBeTruthy();
  }));
});
