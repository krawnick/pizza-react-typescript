import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { cartReducer } from './slices/cart/slice'
import { filterReducer } from './slices/filter/slice'
import { pizzasReducer } from './slices/pizzas/slice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
    pizzas: pizzasReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
type DispatchFunc = () => AppDispatch

// export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
