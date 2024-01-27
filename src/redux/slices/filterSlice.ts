import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { TSortList } from '../../components/Sort'
import { RootState } from '../store'

interface IFilterState {
  categoryState: number
  paginationState: number
  searchState: string
  sortState: TSortList
}

const initialState: IFilterState = {
  categoryState: 0,
  paginationState: 1,
  searchState: '',
  sortState: {
    name: 'популярности',
    sortProperty: 'rating',
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    clearValueSearch: (state) => {
      state.searchState = initialState.searchState
    },
    setSort: (state, action: PayloadAction<TSortList>) => {
      state.sortState = action.payload
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryState = action.payload
    },
    _setValueSearch: (state, action: PayloadAction<string>) => {
      state.categoryState = initialState.categoryState
      state.paginationState = initialState.paginationState
      state.searchState = action.payload
    },
    get setValueSearch() {
      return this._setValueSearch
    },
    set setValueSearch(value) {
      this._setValueSearch = value
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.paginationState = action.payload
    },
    resetFilter: () => initialState,
  },
})

// Actions, reducer

export const {
  clearValueSearch,
  setCategoryId,
  setPage,
  setSort,
  setValueSearch,
  resetFilter,
} = filterSlice.actions

export const filterReducer = filterSlice.reducer

// Selectors

export const selectorFilter = (state: RootState) => state.filter
