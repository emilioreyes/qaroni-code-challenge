import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { NewsResponse } from '../../features/news/list/models/NewsItem';
import { NewsDetailResponse } from '../../features/news/detail/models/news-details.model';

@Injectable({
  providedIn: 'root',
})
export class NewsApi {
  http = inject(HttpClient);
  getNews() {
    return this.http.get<NewsResponse>(`${environment.URL_BASE}/merchants/${environment.MERCHANT_ID}/news`);
  }

  getNewsById(id: number) {
    return this.http.get<NewsDetailResponse>(`${environment.URL_BASE}/merchants/${environment.MERCHANT_ID}/news/${id}`);
  }
}
