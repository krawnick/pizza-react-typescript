import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { TSortList } from '../../../components/Sort'

import { IFilterState } from './types'

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
    setValueSearch: (state, action: PayloadAction<string>) => {
      state.categoryState = initialState.categoryState
      state.paginationState = initialState.paginationState
      state.searchState = action.payload
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