import { RootState } from '../redux/store'

export const updateCartState = (state: RootState['cart']) => {
  state.totalCountState = state.itemsState.reduce((sum, item) => {
    return sum + item.count
  }, 0)

  state.totalPriceState = state.itemsState.reduce((sum, item) => {
    return sum + item.count * item.price
  }, 0)
}
