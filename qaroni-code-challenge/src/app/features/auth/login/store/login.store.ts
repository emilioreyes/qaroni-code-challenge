import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { AuthApi } from '../../../../core/api/auth.api';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, finalize, pipe, switchMap, tap } from 'rxjs';
export interface LoginFormValue {
  username: string;
  password: string;
}
export interface AuthUser {
  id: string;
  name: string;
  username: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}

export interface LoginState {
  form: LoginFormValue;
  session: AuthSession | null;
  error: string | null;
  submitted: boolean;
  loading: boolean;
}

const initialState: LoginState = {
  form: {
    username: '',
    password: '',
  },
  session: null,
  error: null,
  submitted: false,
  loading: false,
};

function toLoginRequest(form: LoginFormValue) {
  return {
    username: form.username,
    password: form.password,
  };
}

function getErrorMessage(error: any): string {
  return error?.error?.message || 'An unexpected error occurred. Please try again.';
}
export const LoginStore = signalStore(
  withState<LoginState>(initialState),

  withComputed((store) => ({
    username: computed(() => store.form().username),
    password: computed(() => store.form().password),
    isAuthenticated: computed(() => !!store.session),
  })),

  withMethods((store, authApi = inject(AuthApi)) => ({
    updateField<K extends keyof LoginFormValue>(key: K, value: LoginFormValue[K]) {
      patchState(store, (state) => ({
        form: {
          ...state.form,
          [key]: value,
        },
        error: null,
      }));
    },

    setUsername(username: string) {
      patchState(store, (state) => ({
        form: {
          ...state.form,
          username,
        },
        error: null,
      }));
    },

    setPassword(password: string) {
      patchState(store, (state) => ({
        form: {
          ...state.form,
          password,
        },
        error: null,
      }));
    },

    markSubmitted() {
      patchState(store, { submitted: true });
    },

    resetForm() {
      patchState(store, {
        ...initialState,
        session: store.session(),
      });
    },

    logout() {
      patchState(store, initialState);
    },

    submit: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, {
            submitted: true,
            loading: true,
            error: null,
          });
        }),
        switchMap(() => {
          const form = store.form();
          return authApi.login(toLoginRequest(form)).pipe(
            tap((session) => {
              patchState(store, {
                error: null,
                session: session as AuthSession,
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
