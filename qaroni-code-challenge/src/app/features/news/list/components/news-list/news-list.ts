import {
  Component,
  input,
  output,
  AfterViewInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
  Type,
  inject,
} from '@angular/core';
import { NewsItem } from '../../models/NewsItem';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../../environments/environment.development';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog'
import { NewsDetailPage } from '../../../detail/pages/news-detail-page/news-detail-page';

@Component({
  selector: 'app-news-list',
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './news-list.html',
  styleUrl: './news-list.scss',
})
export class NewsList implements AfterViewInit, OnChanges {
  /*modalComponentType!: Type<any>;
  modalInputs: { [key: string]: any }={};
  modalComponent:any=null*/
  dialog = inject(MatDialog);

  readonly environment = environment;

  items = input<NewsItem[]>([]);
  loading = input(false);
  error = input<string | null>(null);
  total = input(0);

  filterChange = output<string | null>();

  displayedColumns: string[] = ['title', 'categories', 'language', 'date', 'status', 'Controls'];
  dataSource = new MatTableDataSource<NewsItem>([]);
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
     this.dialog.open(NewsDetailPage, {
      data: {
        new: element,
      },
    });

  }

  onDaoRecieved(data:any){
    console.log(data);
  }
}
