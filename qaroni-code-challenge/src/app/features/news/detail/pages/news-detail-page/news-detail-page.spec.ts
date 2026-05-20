import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDetailPage } from './news-detail-page';
import { NewsDetailStore } from '../../store/news-detail.store';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('NewsDetailPage', () => {
  let component: NewsDetailPage;
  let fixture: ComponentFixture<NewsDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsDetailPage],
      providers: [{ provide: NewsDetailStore},
        {provide: MAT_DIALOG_DATA, useValue: {news: {newsId: '1'}}},
        provideHttpClient()
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
