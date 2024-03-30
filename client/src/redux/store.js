import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userSlice from './userSlice'
import themSlide from './themeSlice'

const rootReducer = combineReducers({
	user: userSlice,
	theme: themSlide
})

const persistConfig = {
	key: 'root',
	storage,
	version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
		})
})

const persistor = persistStore(store)

export { store, persistor }
