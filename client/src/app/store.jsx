import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import { currencyApiSlice } from '../features/api/currencyApiSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authSliceReducers from '../features/auth/authSlice';
import expertSliceReducers from '../features/otherState/expert/expertSlice';
import customerSliceReducers from '../features/otherState/customer/customerSlice';
import articleSliceReducers from '../features/otherState/article/articleSlice';
import otherSliceReducers from '../features/otherState/otherSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [apiSlice.reducerPath, currencyApiSlice.reducerPath],
};

const rootReducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSliceReducers,
  expert: expertSliceReducers,
  customer: customerSliceReducers,
  article: articleSliceReducers,
  other: otherSliceReducers
});
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(
      apiSlice.middleware,
      currencyApiSlice.middleware
    ),
});

export const persistor = persistStore(store);
