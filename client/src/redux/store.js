import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from "../redux/slices/user.slice.js";
import domainReducer from "../redux/slices/domain.slice.js"
import { persistReducer ,persistStore} from "redux-persist";
import  storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    user: userReducer,
    domains:domainReducer
})

const persistConfig = {
    key: "root",
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,

  }),
})

export const persistor = persistStore(store)