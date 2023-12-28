import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryState: 0,
  sortState: {
    name: 'популярности',
    sortProperty: 'rating',
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSort: (state, { payload }) => {
      state.sortState = payload
    },
    setCategoryId: (state, { payload }) => {
      state.categoryState = payload
    },
  },
})

export const filterReducer = filterSlice.reducer
export const { setSort, setCategoryId } = filterSlice.actions
