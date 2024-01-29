import { TSortList } from '../../../components/Sort'

export interface IFilterState {
  categoryState: number
  paginationState: number
  searchState: string
  sortState: TSortList
}
