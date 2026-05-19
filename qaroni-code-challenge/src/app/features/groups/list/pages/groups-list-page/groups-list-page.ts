import { Component, inject } from '@angular/core';
import { GroupsListStore } from '../../store/groups-list.store';
import { GroupsList } from "../../components/groups-list/groups-list";
import { ProgressBar } from '../../../../../core/components/progress-bar/progress-bar';

@Component({
  selector: 'app-groups-list-page',
  imports: [GroupsList, ProgressBar],
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
