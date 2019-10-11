import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'whoscoming',
      storage,
      whitelist: ['auth', 'event']
    },
    reducers
  );
  return persistedReducer;
};
