import { TSortList } from '../components'
import { fetchPizzas } from '../redux/slices/pizzas/slice'

interface IParamsFetch {
  paginationState: number
  searchState: string
  categoryState: number
  sortState: TSortList
}

export const fetchWithParams = ({
  searchState,
  categoryState,
  sortState,
}: IParamsFetch) => {
  const category = categoryState > 0 ? `&category=${categoryState}` : ''
  const sortBy = `&sortBy=${sortState.sortProperty}`
  const order = sortState.desc ? '&order=desc' : ''
  const search = searchState ? `&search=${searchState}` : ''

  return fetchPizzas({ category, sortBy, order, search })
}
