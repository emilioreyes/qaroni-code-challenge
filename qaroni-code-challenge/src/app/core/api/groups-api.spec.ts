import { TestBed } from '@angular/core/testing';

import { GroupsApi } from './groups-api';
import { provideHttpClient } from '@angular/common/http';

describe('GroupsApi', () => {
  let service: GroupsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupsApi,provideHttpClient()]
    });
    service = TestBed.inject(GroupsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
