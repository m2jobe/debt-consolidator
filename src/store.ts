import { combineReducers, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { CalculateReducer } from './features/calculator'

//Todo: Introduce Redux Persist to persist and rehydrate store

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  calculator: CalculateReducer,
})

const store = createStore(
  rootReducer,
  /* preloadedState, */ devToolsEnhancer({})
)

export default store
