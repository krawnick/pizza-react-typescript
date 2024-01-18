import { createSlice } from '@reduxjs/toolkit'

import { findItem } from '../../utils/findItemCart'
import { updateState } from '../../utils/updateStateCart'

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
      const foundItem = findItem(state, payload)

      if (foundItem) {
        foundItem.count++
      } else {
        state.itemsState.push({
          ...payload,
          count: 1,
        })
      }
      updateState(state)
    },

    minusItem: (state, { payload }) => {
      const foundItem = findItem(state, payload)

      if (foundItem && foundItem.count > 1) {
        foundItem.count--
      }
      updateState(state)
    },
    removeItem: (state, { payload }) => {
      state.itemsState = state.itemsState.filter((obj) => {
        return !(
          obj.id === payload.id &&
          obj.size === payload.size &&
          obj.type === payload.type
        )
      })
      updateState(state)
    },
    cleartItems: () => initialState,
  },
})

// Actions, reducer

export const { addItem, minusItem, removeItem, cleartItems } = cartSlice.actions

export const cartReducer = cartSlice.reducer

// Selectors

export const selectorCart = (state) => state.cart
