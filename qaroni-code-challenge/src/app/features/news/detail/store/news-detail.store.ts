import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, finalize, isEmpty, pipe, switchMap, tap } from 'rxjs';
import { NewsDetailItem, NewsDetailResponse } from '../models/news-details.model';
import { NewsApi } from '../../../../core/api/news.api';

interface NewsDetailState {
  item: NewsDetailItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: NewsDetailState = {
  item: null,
  loading: false,
  error: null,
};

function getErrorMessage(error: any): string {
  return error?.error?.message || 'An unexpected error occurred. Please try again.';
}

export const NewsDetailStore = signalStore(
  withState<NewsDetailState>(initialState),
  withComputed((store) => ({
    hasItem: computed(() => !!store.item()),
    isActive: computed(() => store.item()?.status === 'ACTIVE'),
    mainImage: computed(() => {
      const item = store.item();
      if (!item) {
        return;
      }
      return item?.imageUrl || item?.imagesURL[0] || null;
    }),
    author: computed(() => store.item()?.authors[0] || null),
    categories: computed(() => store.item()?.categories ?? []),
    tags: computed(() => store.item()?.tags ?? []),
    spanishDescription: computed(() => {
      const descriptions = store.item()?.descriptions ?? [];
      return descriptions.find((desc) => desc.language === 'es') ?? null;
    }),
    englishDescription: computed(() => {
      const descriptions = store.item()?.descriptions ?? [];
      return descriptions.find((desc) => desc.language === 'en') ?? null;
    }),
  })),
  withMethods((store, newsAPi = inject(NewsApi)) => ({
    clear() {
      patchState(store, initialState);
    },
    loadById: rxMethod<number>(
      pipe(
        tap(() => {
          patchState(store, {
            loading: true,
            error: null,
          });
        }),
        switchMap((id) => {
          return newsAPi.getNewsById(id).pipe(
            tap((response: NewsDetailResponse) => {
              console.log(response);
              patchState(store, {
                item: response.result?.[0] ?? null,
                error: null,
              });
            }),
            catchError((error) => {
              patchState(store, {
                error: getErrorMessage(error),
              });
              return EMPTY;
            }),
            finalize(() => {
              patchState(store, {
                loading: false,
              });
            }),
          );
        }),
      ),
    ),
  })),
);
