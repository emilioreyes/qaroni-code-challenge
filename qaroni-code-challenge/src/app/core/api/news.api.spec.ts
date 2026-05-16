import { TestBed } from '@angular/core/testing';

import { NewsApi } from './news.api';

describe('NewsApi', () => {
  let service: NewsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
