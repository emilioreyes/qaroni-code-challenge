import { TestBed } from '@angular/core/testing';

import { NewsApi } from './news.api';
import { provideHttpClient } from '@angular/common/http';

describe('NewsApi', () => {
  let service: NewsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsApi,provideHttpClient()]
    });
    service = TestBed.inject(NewsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
