import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import thunk from 'redux-thunk'

import gameReducer from './game/reducer'
import activityReducer from './activity/reducer'

const rootReducer = combineReducers({
    gamePlay: gameReducer,
    activities: activityReducer
})

const persistConfig = {
    key: 'tic-tac-toe',
    storage,
    stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export let store = createStore(persistedReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
export let persistor = persistStore(store);