import { configureStore } from '@reduxjs/toolkit'
import { filterReducer } from './slices/filterSlice'
import { cartReducer } from './slices/cartSlice'
import { pizzasReducer } from './slices/pizzasSlice'
// import { searchReducer } from './slices/searchSlice'
// import { paginationReducer } from './slices/paginationSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
    pizzas: pizzasReducer,
  },
})
