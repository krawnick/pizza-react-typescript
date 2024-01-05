import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPriceState: 0,
  itemsState: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      state.itemsState.push(payload)
      state.totalPriceState = state.totalPriceState + payload.price
    },
    removeItem: (state, { payload }) => {
      state.itemsState.filter((obj) => obj.id !== payload)
    },
    cleartItems: () => initialState,
  },
})

export const { addItem, removeItem, cleartItems } = cartSlice.actions
export const cartReducer = cartSlice.reducer
