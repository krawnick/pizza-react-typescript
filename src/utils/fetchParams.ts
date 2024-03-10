import { RootState } from '../redux/store'

export const fetchParams = (state: RootState) => {
  const { categoryState, sortState, searchState } = state.filter

  const category = categoryState > 0 ? `&category=${categoryState}` : ''
  const sortBy = `&sortBy=${sortState.sortProperty}`
  const order = sortState.desc ? '&order=desc' : ''
  const search = searchState ? `&search=${searchState}` : ''

  return category + sortBy + order + search
}
