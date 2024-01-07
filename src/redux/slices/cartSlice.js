import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalCountState: 0,
  totalPriceState: 0,
  itemsState: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      const findItem = state.itemsState.find((obj) => {
        return (
          obj.id === payload.id &&
          obj.size === payload.size &&
          obj.type === payload.type
        )
      })

      if (findItem) {
        findItem.count++
      } else {
        state.itemsState.push({
          ...payload,
          count: 1,
        })
      }

      state.totalCountState = state.itemsState.reduce(
        (sum, item) => sum + item.count,
        0
      )
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
