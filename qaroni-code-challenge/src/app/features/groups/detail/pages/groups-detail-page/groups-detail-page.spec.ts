import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsDetailPage } from './groups-detail-page';

describe('GroupsDetailPage', () => {
  let component: GroupsDetailPage;
  let fixture: ComponentFixture<GroupsDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupsDetailPage]
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
