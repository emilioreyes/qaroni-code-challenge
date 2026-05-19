import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

interface TokenState {
  token: string | null;
  expiresAt: string | null;
}

const STORAGE_KEY = 'auth_token';
const EXPIRATION_KEY = 'auth_token_expiration';

const initialState: TokenState = {
  token: getInitialToken(),
  expiresAt: getInitialExpiration(),
};

function getInitialToken(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error retrieving token from localStorage', error);
    return null;
  }
}

function getInitialExpiration(): string | null {
  try {
    return localStorage.getItem(EXPIRATION_KEY);
  } catch (error) {
    console.error('Error retrieving token expiration from localStorage', error);
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
    setExpiration(expiresAt: string) {
      try {
        localStorage.setItem(EXPIRATION_KEY, expiresAt);
        patchState(store, { expiresAt });
      } catch (error) {
        console.error('Error saving token expiration to localStorage', error);
      }
    },
    hydrate() {
      try {
        const token = localStorage.getItem(STORAGE_KEY);
        patchState(store, { token });
        const expiresAt = localStorage.getItem(EXPIRATION_KEY);
        patchState(store, { expiresAt });
      } catch (error) {
        patchState(store, { token: null, expiresAt: null });
        console.error('Error retrieving token from localStorage', error);
      }
    },
    clearToken() {
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(EXPIRATION_KEY);
        patchState(store, { token: null, expiresAt: null });
      } catch (error) {
        console.error('Error removing token from localStorage', error);
      }
    },
  })),
);
