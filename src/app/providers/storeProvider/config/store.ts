import { configureStore } from '@reduxjs/toolkit';
import { appReducer, AppState } from './appReducer';

export function createReduxStore(initialState?: Partial<AppState>) {
  return configureStore({
    reducer: appReducer,
    devTools: process.env.IS_DEV === 'true',
    preloadedState: initialState,
  });
}

export const store = createReduxStore();
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];