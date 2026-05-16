import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

interface TokenState {
  token: string | null;
}

const STORAGE_KEY = 'auth_token';

const initialState: TokenState = {
  token: getInitialToken(),
};

function getInitialToken(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error retrieving token from localStorage', error);
    return null;
  }
}

export const TokenStore = signalStore(
  { providedIn: 'root' },
  withState<TokenState>(initialState),
  withComputed((store) => ({
    isAuthenticated: computed(() => !!store.token()),
    authorizationHeader: computed(() => (store.token() ? `Bearer ${store.token()}` : null)),
  })),

  withMethods((store) => ({
    setToken(token: string) {
      try {
        localStorage.setItem(STORAGE_KEY, token);
        patchState(store, { token });
      } catch (error) {
        console.error('Error saving token to localStorage', error);
      }
    },
    hydrate() {
      try {
        const token = localStorage.getItem(STORAGE_KEY);
        patchState(store, { token });
      } catch (error) {
        patchState(store, { token: null });
        console.error('Error retrieving token from localStorage', error);
      }
    },
    clearToken() {
      try {
        localStorage.removeItem(STORAGE_KEY);
        patchState(store, { token: null });
      } catch (error) {
        console.error('Error removing token from localStorage', error);
      }
    },
  })),
);
