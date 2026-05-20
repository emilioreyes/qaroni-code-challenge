import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, finalize, pipe, switchMap, tap } from 'rxjs';
import { GroupDetailItem, GroupDetailResponse } from '../model/groups-details.model';
import { GroupsApi } from '../../../../core/api/groups-api';

interface GroupsDetailState {
  item: GroupDetailItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: GroupsDetailState = {
  item: null,
  loading: false,
  error: null,
};

function getErrorMessage(error: any): string {
  return error?.error?.message || 'An unexpected error occurred. Please try again.';
}

export const GroupsDetailStore = signalStore(
  withState<GroupsDetailState>(initialState),
  withComputed((store) => ({
    hasItem: computed(() => !!store.item()),
    isActive: computed(() => store.item()?.status === 'ACTIVE'),
    imageUrl: computed(() => store.item()?.imageUrl ?? null),
    category: computed(() => store.item()?.category ?? null),
    relatedGroups: computed(() => store.item()?.category?.groups ?? []),
    relatedGroupsCount: computed(() => store.item()?.category?.groups.length ?? 0),
    settings: computed(() => store.item()?.setting ?? null),
    isPaid: computed(() => store.item()?.isPaid ?? false),
    requiresApproval: computed(() => store.item()?.hasApproval ?? false),
    hasRenewal: computed(() => store.item()?.setting?.hasRenewal),
    hasExpiration: computed(() => store.item()?.setting?.hasExpiration),
    categoryName: computed(() => store.item()?.category?.name ?? ''),
    categoryDescription: computed(() => store.item()?.category?.description ?? ''),
  })),
  withMethods((store, groupsApi = inject(GroupsApi)) => ({
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
          return groupsApi.getGroupById(id).pipe(
            tap((response: GroupDetailResponse) => {
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
