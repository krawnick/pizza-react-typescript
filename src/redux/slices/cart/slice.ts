import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ICartItem, TCartItemAction } from '../../../components/CartItem'
import { findItem } from '../../../utils/findItemCart'
import { getCartFromLS } from '../../../utils/getCartFromLS'
import { updateCartState } from '../../../utils/updateCartState'

import { ICartState } from './types'

const { itemsState, totalCountState, totalPriceState } = getCartFromLS()

const initialState: ICartState = {
  itemsState,
  totalCountState,
  totalPriceState,
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
      updateCartState(state)
    },

    minusItem: (state, action: PayloadAction<TCartItemAction>) => {
      const foundItem = findItem(state, action.payload)

      if (foundItem && foundItem.count > 1) {
        foundItem.count--
      }
      updateCartState(state)
    },
    removeItem: (state, action: PayloadAction<TCartItemAction>) => {
      state.itemsState = state.itemsState.filter((obj) => {
        return !(
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        )
      })
      updateCartState(state)
    },
    clearItems: (state) => {
      state.itemsState = []
      updateCartState(state)
    },
  },
})

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions

export const cartReducer = cartSlice.reducer
