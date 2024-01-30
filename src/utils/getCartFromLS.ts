import { ICartState } from '../redux/slices/cart/types'

export const getCartFromLS = (): ICartState => {
  const json = localStorage.getItem('cart')

  if (!json) {
    return { itemsState: [], totalCountState: 0, totalPriceState: 0 }
  }

  const { itemsState, totalCountState, totalPriceState } = json
    ? JSON.parse(json)
    : []

  return { itemsState, totalCountState, totalPriceState }
}
