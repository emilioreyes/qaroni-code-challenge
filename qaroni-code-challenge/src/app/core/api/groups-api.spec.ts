import { TestBed } from '@angular/core/testing';

import { GroupsApi } from './groups-api';

describe('GroupsApi', () => {
  let service: GroupsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
