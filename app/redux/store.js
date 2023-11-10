import { combineReducers, configureStore, isAllOf } from '@reduxjs/toolkit'
import followReducer from './followReducer'
import postReducer from './postReducer'
import persistStore from 'redux-persist/es/persistStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';

// export default configureStore({
//     reducer:{
//         follow:followReducer,
//         post:postReducer
//     }
// })


const rootReducer = combineReducers({
        follow:followReducer,
        post:postReducer
  });

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

 export const store = configureStore({
    reducer: persistedReducer,
  })

 export const persistor = persistStore(store);

//   export {store,persistor}