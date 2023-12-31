import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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

export const filterReducer = filterSlice.reducer
export const {
  clearValueSearch,
  setCategoryId,
  setPage,
  setSort,
  setValueSearch,
} = filterSlice.actions
