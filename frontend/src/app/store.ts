import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../features/users/usersSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import { projectsReducer } from '../features/projects/projectsSlice';
import { tasksReducer } from '../features/ tasks/tasksSlice';
import { eventsReducer } from '../features/events/eventsSlice';

const usersPersistConfig = {
  key: 'be-creative:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
  events: eventsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
