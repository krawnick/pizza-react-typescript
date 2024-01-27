import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ICartItem, TCartItemAction } from '../../components/CartItem'
import { findItem } from '../../utils/findItemCart'
import { updateState } from '../../utils/updateStateCart'
import { RootState } from '../store'

interface ICartState {
  totalCountState: number
  totalPriceState: number
  itemsState: ICartItem[]
}

const initialState: ICartState = {
  totalCountState: 0,
  totalPriceState: 0,
  itemsState: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartItem>) => {
      const foundItem = findItem(state, action.payload)

      if (foundItem && foundItem.count > 0) {
        foundItem.count++
      } else {
        state.itemsState.push({
          ...action.payload,
          count: 1,
        })
      }
      updateState(state)
    },

    minusItem: (state, action: PayloadAction<TCartItemAction>) => {
      const foundItem = findItem(state, action.payload)

      if (foundItem && foundItem.count > 1) {
        foundItem.count--
      }
      updateState(state)
    },
    removeItem: (state, action: PayloadAction<TCartItemAction>) => {
      state.itemsState = state.itemsState.filter((obj) => {
        return !(
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
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

export const selectorCart = (state: RootState) => state.cart
