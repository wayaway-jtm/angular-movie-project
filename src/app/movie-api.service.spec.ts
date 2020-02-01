import { TestBed } from '@angular/core/testing';

import { MovieAPIService } from './movie-api.service';

describe('MovieAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieAPIService = TestBed.get(MovieAPIService);
    expect(service).toBeTruthy();
  });
});
