import { TestBed } from '@angular/core/testing';
import { GroupsApi } from '../../../../core/api/groups-api';
import { GroupsListStore } from './groups-list.store';
import { of, throwError } from 'rxjs';

describe('GroupsListStore', () => {
  let store: InstanceType<typeof GroupsListStore>;
  let groupApiSpy: jasmine.SpyObj<GroupsApi>;
  const mockResponse = {
    count: 2,
    included: null,
    input: 'VERBO/recurso',
    result: [
      {
        merchantId: 57,
        serieId: 59,
        templateUUID: 'ad126412-90bd-4395-b924-93f523d70da4',
        status: 'ACTIVE',
        position: 1,
        type: 'PERSON',
        isPaid: true,
        isPartner: false,
        hasApproval: true,
        hasPartner: false,
        name: 'Socio basico sin pago con extras',
        description: null,
        groupId: 180,
        imageUrl: null,
        category: {
          language: 'es',
          slug: 'tipos-de-socios',
          name: 'Tipos de socios',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        serie: {
          preffix: 'ZMB/',
          creationDate: '',
          lastUpdateDate: '',
          serieId: 59,
        },
      },
      {
        merchantId: 57,
        serieId: 59,
        templateUUID: null,
        status: 'ACTIVE',
        position: 1,
        type: 'PERSON',
        isPaid: true,
        isPartner: false,
        hasApproval: false,
        hasPartner: false,
        name: 'Socio Chinpower',
        description: null,
        groupId: 175,
        imageUrl: null,
        category: null,
        serie: {
          preffix: 'ZMB/',
          creationDate: '',
          lastUpdateDate: '',
          serieId: 59,
        },
      },
    ],
    links: null,
  };
  beforeEach(() => {
    groupApiSpy = jasmine.createSpyObj('GroupsApi', ['getGroups']);

    TestBed.configureTestingModule({
      providers: [GroupsListStore, { provide: GroupsApi, useValue: groupApiSpy }],
    });
    store = TestBed.inject(GroupsListStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should set status filter', () => {
    store.setStatusFilter('ACTIVE');
    expect(store.selectedStatus()).toBe('ACTIVE');
  });
  
  it('should clear filter', () => {
    store.setStatusFilter('ACTIVE');
    expect(store.selectedStatus()).toBe('ACTIVE');
    store.clearFilter();
    expect(store.selectedStatus()).toBeNull();
  });

  it('should reset state', () => {
    groupApiSpy.getGroups.and.returnValue(of(mockResponse));
    store.load();
    store.setStatusFilter('ACTIVE');
    expect(store.items().length).toBe(2);
    expect(store.selectedStatus()).toBe('ACTIVE');
    store.reset();
    expect(store.items().length).toBe(0);
    expect(store.count()).toBe(0);
    expect(store.selectedStatus()).toBeNull();
  });

  it('should load groups', () => {
    groupApiSpy.getGroups.and.returnValue(of(mockResponse));
    store.load();
    expect(store.loading()).toBeFalse();
    expect(store.error()).toBeNull();
    expect(store.items().length).toBe(2);
    expect(store.count()).toBe(2);
  });

  it('should compute active items', () => {
    groupApiSpy.getGroups.and.returnValue(of(mockResponse));
    store.load();
    expect(store.activeItems().length).toBe(2);
    expect(store.activeItems().every(item => item.status === 'ACTIVE')).toBeTrue();
  });

  it('should compute paid items', () => {
    groupApiSpy.getGroups.and.returnValue(of(mockResponse));
    store.load();
    expect(store.paidItems().length).toBe(2);
    expect(store.paidItems().every(item => item.isPaid)).toBeTrue();
  });

  it('should retuirn all items when selected status is null', () => {
    groupApiSpy.getGroups.and.returnValue(of(mockResponse));
    store.load();
    store.clearFilter();
    expect(store.filteredItems().length).toBe(2);
  });

  it('should filter items by selected status', () => {
    const mockResponseWithDifferentStatus = {
      ...mockResponse,
      result: [
        {
          ...mockResponse.result[0],
          status: 'ACTIVE'
        },{
            ...mockResponse.result[1],  
            status: 'INACTIVE',
        }
      ],
    };
    groupApiSpy.getGroups.and.returnValue(of(mockResponseWithDifferentStatus));
    store.load();
    store.setStatusFilter('ACTIVE');
    expect(store.filteredItems().length).toBe(1);
    expect(store.filteredItems()[0].status).toBe('ACTIVE')
    expect(store.filteredItems()[0].groupId).toBe(180);
  });

  it('should set error when loading fails', () => {
    groupApiSpy.getGroups.and.returnValue(
        throwError(()=>({
            error:{
                message: 'request failed'
            }
        }))
    )

    store.load();
    expect(store.loading()).toBeFalse();
    expect(store.error()).toBe('request failed');
    expect(store.items().length).toBe(0);
    expect(store.count()).toBe(0);

  });
});
