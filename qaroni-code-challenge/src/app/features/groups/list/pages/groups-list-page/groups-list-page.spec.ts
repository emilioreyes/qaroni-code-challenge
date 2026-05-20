import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsListPage } from './groups-list-page';
import { GroupsListStore } from '../../store/groups-list.store';
import { provideHttpClient } from '@angular/common/http';

describe('GroupsListPage', () => {
  let component: GroupsListPage;
  let fixture: ComponentFixture<GroupsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupsListPage],
      providers: [{ provide: GroupsListStore},
        provideHttpClient()
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
