import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ICartItem, TCartItemAction } from '../../components/CartItem'
import { findItem } from '../../utils/findItemCart'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { updateStateCart } from '../../utils/updateCartState'
import { RootState } from '../store'

interface ICartState {
  itemsState: ICartItem[]
  totalCountState: number
  totalPriceState: number
}

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
      updateStateCart(state)
    },

    minusItem: (state, action: PayloadAction<TCartItemAction>) => {
      const foundItem = findItem(state, action.payload)

      if (foundItem && foundItem.count > 1) {
        foundItem.count--
      }
      updateStateCart(state)
    },
    removeItem: (state, action: PayloadAction<TCartItemAction>) => {
      state.itemsState = state.itemsState.filter((obj) => {
        return !(
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        )
      })
      updateStateCart(state)
    },
    clearItems: (state) => {
      state.itemsState = []
      updateStateCart(state)
    },
  },
})

// Actions, reducer

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions

export const cartReducer = cartSlice.reducer

// Selectors

export const selectorCart = (state: RootState) => state.cart
