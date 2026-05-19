import { Component, inject, OnInit } from '@angular/core';
import { NewsList } from '../../components/news-list/news-list';
import { NewsListStore } from '../../store/news-list.store';
import { ProgressBar } from '../../../../../core/components/progress-bar/progress-bar';

@Component({
  selector: 'app-news-list-page',
  imports: [NewsList, ProgressBar],
  templateUrl: './news-list-page.html',
  styleUrl: './news-list-page.scss',
  providers: [NewsListStore],
})
export class NewsListPage {
  readonly store = inject(NewsListStore);

  constructor() {
    this.store.load();
  }

  onStatusChange(status: string | null) {
    this.store.setstausFilter(status);
  }
}
