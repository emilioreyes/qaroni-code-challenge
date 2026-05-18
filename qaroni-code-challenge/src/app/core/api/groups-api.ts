import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GroupListResponse } from '../../features/groups/list/models/groups-list.model';
import { environment } from '../../../environments/environment.development';
import { GroupDetailResponse } from '../../features/groups/detail/model/groups-details.model';

@Injectable({
  providedIn: 'root',
})
export class GroupsApi {
  http = inject(HttpClient);
  getGroups() {
    return this.http.get<GroupListResponse>(
      `${environment.URL_BASE}/merchants/${environment.MERCHANT_ID}/groups`,
    );
  }

  getGroupById(id: number) {
    return this.http.get<GroupDetailResponse>(
      `${environment.URL_BASE}/merchants/${environment.MERCHANT_ID}/groups/${id}`,
    );
  }
}
