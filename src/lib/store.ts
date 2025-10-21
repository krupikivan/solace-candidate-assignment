import { configureStore } from '@reduxjs/toolkit';
import advocatesReducer from '@/features/advocates/advocatesSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      advocates: advocatesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
