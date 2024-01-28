import { RootState } from '../redux/store'

import { getCartFromLS } from './getCartFromLS'

export const updateStateCart = (state: RootState['cart']) => {
  state.totalPriceState = getCartFromLS().totalPriceState
  state.totalCountState = getCartFromLS().totalCountState
  console.log('state.totalPriceState', state.totalPriceState)
  console.log('state.totalCountState', state.totalCountState)
}
