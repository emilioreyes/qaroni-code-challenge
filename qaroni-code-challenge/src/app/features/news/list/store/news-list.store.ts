import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, finalize, isEmpty, pipe, switchMap, tap } from 'rxjs';
import { NewsItem, NewsLinks } from '../models/NewsItem';
import { NewsApi } from '../../../../core/api/news.api';

interface NewsListState {
  items: NewsItem[];
  count: number;
  included: unknown | null;
  input: string | null;
  links: NewsLinks | null;
  loading: boolean;
  error: string | null;
  selectedStatus: string | null;
}

const initialState: NewsListState = {
  items: [],
  count: 0,
  included: null,
  input: null,
  links: null,
  loading: false,
  error: null,
  selectedStatus: null,
};

function getErrorMessage(error: any): string {
  return error?.error?.message || 'An unexpected error occurred. Please try again.';
}

export const NewsListStore = signalStore(
  withState<NewsListState>(initialState),

  withComputed((store) => ({
    hastItems: computed(() => store.items().length > 0),
    isEmpty: computed(() => !store.loading && store.items().length === 0),
    totalItems: computed(() => store.count()),
    hasNextPage: computed(() => !!store.links()?.next),
    hasPreviousPage: computed(() => !!store.links()?.prev),
    activeItems: computed(() => store.items().filter((item) => item.status === 'ACTIVE')),
    filteredItems: computed(() => {
      const status = store.selectedStatus();
      if (!status) {
        return store.items();
      }
      return store.items().filter((item) => item.status === status);
    }),
  })),

  withMethods((store, newsAPi = inject(NewsApi)) => ({
    setstausFilter(status: string | null) {
      patchState(store, { selectedStatus: status });
    },

    clearfilter() {
      patchState(store, { selectedStatus: null });
    },
    reset() {
      patchState(store, initialState);
    },

    load: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, {
            loading: true,
            error: null,
          });
        }),
        switchMap(() => {
          return newsAPi.getNews().pipe(
            tap((response) => {
              console.log(response);
              
              patchState(store, {
                items: response.result ?? [],
                count: response.count ?? 0,
                included: response.included ?? null,
                input: response.input ?? null,
                links: response.links ?? null,
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
