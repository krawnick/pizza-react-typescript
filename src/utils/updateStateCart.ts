import { RootState } from '../redux/store'

export const updateState = (state: RootState['cart']) => {
  state.totalCountState = state.itemsState.reduce(
    (sum, item) => sum + item.count,
    0
  )
  state.totalPriceState = state.itemsState.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  )
}
