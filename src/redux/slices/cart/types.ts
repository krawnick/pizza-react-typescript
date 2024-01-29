import { ICartItem } from '../../../components/CartItem'

export interface ICartState {
  itemsState: ICartItem[]
  totalCountState: number
  totalPriceState: number
}
