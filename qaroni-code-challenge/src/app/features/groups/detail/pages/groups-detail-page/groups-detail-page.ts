import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { GroupsDetailStore } from '../../store/groups-detail.store';
import { environment } from '../../../../../../environments/environment.development';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-groups-detail-page',
  imports: [MatCardModule,MatButtonModule,CommonModule],
  templateUrl: './groups-detail-page.html',
  styleUrl: './groups-detail-page.scss',
  providers: [GroupsDetailStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsDetailPage implements OnInit {
readonly store = inject(GroupsDetailStore);
  environment = environment;
  data = inject(MAT_DIALOG_DATA);
  ngOnInit(): void {
    console.log(this.data);
    const id = this.data?.group?.groupId;
    if(id) {
      this.store.loadById(id);
    }
  }
}
