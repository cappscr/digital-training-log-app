import { TestBed } from '@angular/core/testing';

import { PaceService } from './pace-service.service';

describe('PaceServiceService', () => {
  let service: PaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
