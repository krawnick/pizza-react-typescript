import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

type TSort = {
  name: string
  sortProperty: 'rating' | 'price' | 'name'
  desc?: boolean
}

interface IFilterState {
  categoryState: number
  paginationState: number
  searchState: string
  sortState: TSort
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
    setSort: (state, { payload }) => {
      state.sortState = payload
    },
    setCategoryId: (state, { payload }) => {
      state.categoryState = payload
    },
    setValueSearch: (state, { payload }) => {
      state.categoryState = initialState.categoryState
      state.paginationState = initialState.paginationState
      state.searchState = payload
    },
    setPage: (state, { payload }) => {
      state.paginationState = payload
    },
  },
})

// Actions, reducer

export const {
  clearValueSearch,
  setCategoryId,
  setPage,
  setSort,
  setValueSearch,
} = filterSlice.actions

export const filterReducer = filterSlice.reducer

// Selectors

export const selectorFilter = (state: RootState) => state.filter
