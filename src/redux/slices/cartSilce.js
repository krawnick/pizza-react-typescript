import { createSlice } from '@reduxjs/toolkit'

const initialState = { totalPrice: 0, items: [], quantityItems: 0 }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      state.items.push(payload)
    },
    removeItem: (state, { payload }) => {
      state.items.filter((obj) => obj.id !== payload)
    },
    cleartItems: () => initialState,
  },
})

export const { addItem, removeItem, cleartItems } = cartSlice.actions
export const cartReducer = cartSlice.reducer
