import { TCartItemAction } from '../components/CartItem'
import { RootState } from '../redux/store'

export const findItem = (
  state: RootState['cart'],
  payload: TCartItemAction
) => {
  return state.itemsState.find((obj) => {
    return (
      obj.id === payload.id &&
      obj.size === payload.size &&
      obj.type === payload.type
    )
  })
}
