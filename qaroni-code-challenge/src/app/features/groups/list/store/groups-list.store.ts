import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, finalize, isEmpty, pipe, switchMap, tap } from 'rxjs';
import { GroupItem } from '../models/groups-list.model';
import { GroupsApi } from '../../../../core/api/groups-api';

interface GroupsListState {
  items: GroupItem[];
  count: number;
  included: unknown | null;
  input: string | null;
  links: unknown | null;
  loading: boolean;
  error: string | null;
  selectedStatus: string | null;
}
const initialState: GroupsListState = {
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

export const GroupsListStore = signalStore(
  withState<GroupsListState>(initialState),
  withComputed((store) => ({
    hasItems: computed(() => store.items().length > 0),
    isEmpty: computed(() => !store.loading && store.items().length === 0),
    totalItems: computed(() => store.count()),
    activeItems: computed(() => store.items().filter((item) => item.status === 'ACTIVE')),
    paidItems: computed(() => store.items().filter((item) => item.isPaid)),
    approvalRequiredItems: computed(() => store.items().filter((item) => item.hasApproval)),
    filteredItems: computed(() => {
      const selectedStatus = store.selectedStatus();
      if (!selectedStatus) {
        return store.items();
      }
      return store.items().filter((item) => item.status === selectedStatus);
    }),
  })),
  withMethods((store, groupsApi = inject(GroupsApi)) => ({
    setStatusFilter(status: string | null) {
      patchState(store, { selectedStatus: status });
    },
    clearFilter() {
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
          return groupsApi.getGroups().pipe(
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
