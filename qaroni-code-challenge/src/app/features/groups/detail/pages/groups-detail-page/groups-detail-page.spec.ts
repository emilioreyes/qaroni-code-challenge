import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsDetailPage } from './groups-detail-page';
import { provideHttpClient } from '@angular/common/http';
import { GroupsDetailStore } from '../../store/groups-detail.store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('GroupsDetailPage', () => {
  let component: GroupsDetailPage;
  let fixture: ComponentFixture<GroupsDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupsDetailPage],
      providers: [{ provide: GroupsDetailStore},
        {provide: MAT_DIALOG_DATA, useValue: {group: {groupId: '1'}}},
        provideHttpClient()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
