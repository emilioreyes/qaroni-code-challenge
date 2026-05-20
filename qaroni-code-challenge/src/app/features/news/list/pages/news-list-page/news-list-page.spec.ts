import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListPage } from './news-list-page';
import { NewsListStore } from '../../store/news-list.store';
import { provideHttpClient } from '@angular/common/http';

describe('NewsListPage', () => {
  let component: NewsListPage;
  let fixture: ComponentFixture<NewsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsListPage],
      providers: [{ provide: NewsListStore},
        provideHttpClient()
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
