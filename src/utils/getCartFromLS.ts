import { ICartState } from '../redux/slices/cartSlice'

export const getCartFromLS = (): ICartState => {
  const json = localStorage.getItem('cart')
  const { itemsState, totalCountState, totalPriceState } = json
    ? JSON.parse(json)
    : []

  return { itemsState, totalCountState, totalPriceState }
}
