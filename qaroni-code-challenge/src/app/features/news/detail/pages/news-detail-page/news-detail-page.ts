import { Component, ChangeDetectionStrategy,inject, OnInit } from '@angular/core';
import { NewsDetailStore } from '../../store/news-detail.store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../../environments/environment.development';

@Component({
  selector: 'app-news-detail-page',
  imports: [MatCardModule,MatButtonModule,CommonModule],
  templateUrl: './news-detail-page.html',
  styleUrl: './news-detail-page.scss',
  providers: [NewsDetailStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsDetailPage implements OnInit {
  readonly store = inject(NewsDetailStore);
  environment = environment;
  data = inject(MAT_DIALOG_DATA);
  ngOnInit(): void {
    console.log(this.data);
    const id = this.data?.new?.newId;
    if(id) {
      this.store.loadById(id);
    }
  }
}
