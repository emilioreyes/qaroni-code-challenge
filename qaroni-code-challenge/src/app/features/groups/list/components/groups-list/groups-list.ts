import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, input, OnChanges, output, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { environment } from '../../../../../../environments/environment.development';
import { GroupItem } from '../../models/groups-list.model';
import { GroupsDetailPage } from '../../../detail/pages/groups-detail-page/groups-detail-page';

@Component({
  selector: 'app-groups-list',
   imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './groups-list.html',
  styleUrl: './groups-list.scss',
})
export class GroupsList implements AfterViewInit, OnChanges {
dialog = inject(MatDialog);

  readonly environment = environment;

  items = input<GroupItem[]>([]);
  loading = input(false);
  error = input<string | null>(null);
  total = input(0);

  filterChange = output<string | null>();

  displayedColumns: string[] = ['name','hasActivity','hasApproval','hasPartner','isPaid','isPartner','isSubscribed','slug','status','Controls'];
  dataSource = new MatTableDataSource<GroupItem>([]);
  pageSize = 25;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.dataSource.data = this.items();
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onView(element: any) {
    console.log(element);
     this.dialog.open(GroupsDetailPage, {
      data: {
        group: element,
      },
    });

  }

  onDaoRecieved(data:any){
    console.log(data);
  }
}
