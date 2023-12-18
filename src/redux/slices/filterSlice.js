import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSort: (state, { payload }) => {
      state.sort = payload
    },
    setCategoryId: (state, { payload }) => {
      state.categoryId = payload
    },
  },
})

export const filterReducer = filterSlice.reducer
export const { setSort, setCategoryId } = filterSlice.actions
