import { TestBed } from '@angular/core/testing';

import { WatchlistService } from './watchlist.service';

describe('WatchlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WatchlistService = TestBed.get(WatchlistService);
    expect(service).toBeTruthy();
  });
});
