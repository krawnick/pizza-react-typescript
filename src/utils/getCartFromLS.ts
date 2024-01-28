import { ICartItem } from '../components/CartItem'

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart')
  const itemsState = data ? JSON.parse(data) : []

  const totalCountState = itemsState.reduce((sum: number, item: ICartItem) => {
    return sum + item.count
  }, 0)

  const totalPriceState = itemsState.reduce((sum: number, item: ICartItem) => {
    return sum + item.price * item.count
  }, 0)

  return {
    itemsState,
    totalCountState,
    totalPriceState,
  }
}
