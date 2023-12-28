import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: { searchState: '' },
  reducers: {
    setValueSearch: (state, { payload }) => {
      state = payload
    },
    clearValueSearch: (state) => (state = initialState),
  },
})

export const searchReducer = searchSlice.reducer
export const { setValueSearch, clearValueSearch } = searchSlice.actions
