import { Component, inject } from '@angular/core';
import { GroupsListStore } from '../../store/groups-list.store';
import { GroupsList } from "../../components/groups-list/groups-list";

@Component({
  selector: 'app-groups-list-page',
  imports: [GroupsList],
  templateUrl: './groups-list-page.html',
  styleUrl: './groups-list-page.scss',
  providers: [GroupsListStore]
})
export class GroupsListPage {
readonly store = inject(GroupsListStore);

  constructor() {
    this.store.load();
  }

  onStatusChange(status: string | null) {
    this.store.setStatusFilter(status);
  }
}
