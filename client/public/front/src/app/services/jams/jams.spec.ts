import { TestBed } from '@angular/core/testing';

import { Jams } from './jams';

describe('Jams', () => {
  let service: Jams;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Jams);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
