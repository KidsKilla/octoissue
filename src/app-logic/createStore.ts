import {
  configureStore,
  ReducersMapObject,
  Action,
  PayloadAction,
} from '@reduxjs/toolkit'
import { ROOT_REDUCER } from './reducerMap'

export const createStore = <S, A extends Action = PayloadAction>(
  reducer?: ReducersMapObject<S, A>,
) =>
  configureStore({
    reducer: {
      ...reducer,
      ...ROOT_REDUCER,
    },
    devTools: true,
  })
